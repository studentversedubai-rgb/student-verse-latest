import React, { useEffect, useState } from "react";
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

  return (
    <div style={{ paddingTop: "0", marginTop: "0" }}>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", gap: "0", paddingTop: "0" }}>
        <FAQ />
        <TeamSection />

        <MainFooter />
        <Footer />
      </div>
      {/* Keep the original HTML for any remaining content */}
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </div>
  );
}
