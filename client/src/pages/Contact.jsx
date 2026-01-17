import React, { useEffect, useState } from "react";
import { initPageInteractions } from "../utils/initInteractions";
import { normalizeHtml } from "../utils/normalizeHtml";
import Navbar from "./Navbar";
import ContactHero from "../components/ContactHero";
import MainFooter from "../components/Footer";
import Footer from "./Footer";

export default function Contact() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/raw/contact.html")
      .then((res) => res.text())
      .then((text) => setHtml(normalizeHtml(text)));
  }, []);

  useEffect(() => {
    if (!html) return;
    const timer = setTimeout(() => {
      initPageInteractions(document);
    }, 0);
    return () => clearTimeout(timer);
  }, [html]);

  return (
    <>
      <Navbar />
      <ContactHero />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  );
}
