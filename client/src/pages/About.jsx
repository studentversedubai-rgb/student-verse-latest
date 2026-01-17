import React, { useEffect, useState } from "react";
import { initPageInteractions } from "../utils/initInteractions";
import { normalizeHtml } from "../utils/normalizeHtml";
import Navbar from "./Navbar";
import TeamSection from "../components/TeamSection";
import FAQ from "../components/FAQ";
import MainFooter from "../components/Footer";
import Footer from "./Footer";

export default function About() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/raw/about.html")
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
    <div style={{ paddingTop: "40px" }}>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <TeamSection />
        <FAQ />
        <MainFooter />
        <Footer />
      </div>
      {/* Keep the original HTML for any remaining content */}
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </div>
  );
}
