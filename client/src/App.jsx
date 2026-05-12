import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AnimatedBackground from "./components/layout/AnimatedBackground";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Business from "./pages/Business.jsx";
import Waitlist from "./pages/Waitlist";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Cookies from "./pages/Cookies.jsx";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("is-loaded");
    return () => document.documentElement.classList.remove("is-loaded");
  }, []);

  return (
    <AuthProvider>
      <AnimatedBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
          <Route path="/waitlist" element={<Navigate to="/" replace />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
