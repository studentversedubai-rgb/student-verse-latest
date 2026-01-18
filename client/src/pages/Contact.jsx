import { useEffect, useState } from "react";
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
