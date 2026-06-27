import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import MainFooter from "../components/layout/Footer";
import PartnerBanner from "../components/layout/PartnerBanner";
import LogoLoop from "../components/ui/LogoLoop";
import Counter from "../components/ui/Counter";

const C = {
  blue: "#2962ff",
  violet: "#7b2cbf",
  cyan: "#00f0ff",
  orange: "#ff9800",
};

const sectionTitleStyle = {
  fontSize: "clamp(2.7rem, 7vw, 5.6rem)",
  fontWeight: 900,
  lineHeight: 0.96,
  letterSpacing: "-0.035em",
  margin: "0 0 1rem",
  background: "linear-gradient(315deg,#d5d9e8,#ffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const sectionCopyStyle = {
  color: "rgba(255,255,255,.66)",
  fontSize: "clamp(1rem,1.6vw,1.08rem)",
  lineHeight: 1.82,
  maxWidth: 760,
  margin: "0 auto",
};

function CenterSection({ id, kicker, title, children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className="about-page-section"
      style={{
        position: "relative",
        padding: "clamp(72px, 10vw, 110px) 20px",
        overflow: "hidden",
        ...style,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        style={{ maxWidth: 1060, margin: "0 auto", textAlign: "center" }}
      >
        {kicker && <p className="sv-kicker">{kicker}</p>}
        {title && <h2 className="about-section-title" style={sectionTitleStyle}>{title}</h2>}
        {children}
      </motion.div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: "min(720px, 86vh)",
        padding: "clamp(7rem, 13vh, 9rem) 20px clamp(4rem, 8vh, 6rem)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="about-native-hero"
      >
        <div className="about-hero-copy">
          <p className="about-pill">StudentVerse in one view</p>
          <h1>
            <span>One place for</span>
            <span>student life perks.</span>
          </h1>
          <p>
            StudentVerse brings verified student access, local offers, partner rewards, and guided discovery into one calm experience built for university life.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function AboutTitleSection() {
  return (
    <section className="about-title-section">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="about-title-inner"
      >
        <h1>About Us</h1>
      </motion.div>
    </section>
  );
}

function AboutIntroSection() {
  return (
    <section className="about-reference-section">
      <div className="about-intro-grid">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="about-intro-copy"
        >
          <h2>Our Mission</h2>
          <p>
            StudentVerse helps university students save money and access useful student benefits in one place. Through verified discounts, brand rewards, SV Orbit AI, and other student-focused perks, we aim to make university life easier, more affordable, and more convenient.
          </p>
          <a href="/contact" className="about-contact-link">Contact Us</a>
        </motion.div>
      </div>
    </section>
  );
}

const OFFER_ITEMS = [
  {
    label: "SV Orbit AI",
    text: "Guides students toward useful offers, places, and platform actions faster.",
    accent: C.violet,
  },
  {
    label: "Discounts",
    text: "Keeps student-friendly brand offers easier to discover and redeem.",
    accent: C.blue,
  },
  {
    label: "Partner Visibility",
    text: "Gives brands a clearer way to reach active university students.",
    accent: C.orange,
  },
];

const ABOUT_STATS = [
  { value: 30, suffix: "", label: "Partner Brands", places: [10, 1] },
  { value: 10, suffix: "+", label: "Universities", places: [10, 1] },
  { value: 1000, suffix: "+", label: "Students", places: [1000, 100, 10, 1] },
];

function StatCounter({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setValue(stat.value), 120);
    return () => window.clearTimeout(id);
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="about-stat-number">
      <Counter
        value={value}
        places={stat.places}
        fontSize={78}
        padding={8}
        gap={0}
        horizontalPadding={0}
        textColor="#f7f8ff"
        fontWeight={900}
        gradientHeight={12}
        gradientFrom="#050711"
        gradientTo="transparent"
      />
      <span>{stat.suffix}</span>
    </div>
  );
}

function OfferStatsSection() {
  return (
    <section className="about-reference-section about-offer-section">
      <div className="about-offer-grid">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="about-offer-copy"
        >
          <h2>What We Offer</h2>
          <p>
            A focused set of tools for students and partners, kept simple enough to understand at a glance.
          </p>
          <div className="about-offer-list">
            {OFFER_ITEMS.map((item) => (
              <div key={item.label} className="about-offer-row" style={{ "--accent": item.accent }}>
                <div className="about-offer-row-head">
                  <span>{item.label}</span>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="about-stats-grid"
        >
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="about-stat-item">
              <StatCounter stat={stat} />
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const FLOW = [
  { label: "Verify", text: "Confirm student status once.", accent: C.blue },
  { label: "Discover", text: "Find relevant offers faster.", accent: C.orange },
  { label: "Redeem", text: "Use benefits with less friction.", accent: C.violet },
];

function MissionSection() {
  return (
    <CenterSection kicker="Why We Exist" title="Built to reduce student friction.">
      <p style={sectionCopyStyle}>
        Students should not need to chase scattered offers, repeat proof of status, or guess which brands are student-friendly. StudentVerse organizes that journey into a clearer flow.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          margin: "42px auto 0",
          maxWidth: 840,
        }}
        className="about-simple-grid"
      >
        {FLOW.map((item) => (
          <div
            key={item.label}
            className="sv-surface-card"
            style={{ "--accent": item.accent, minHeight: 150, textAlign: "center" }}
          >
            <div style={{ width: 38, height: 3, borderRadius: 999, background: item.accent, margin: "0 auto 18px" }} />
            <h3 className="sv-card-title">{item.label}</h3>
            <p className="sv-card-copy">{item.text}</p>
          </div>
        ))}
      </div>
    </CenterSection>
  );
}

const PRINCIPLES = [
  {
    title: "Student Proof",
    text: "A trusted student profile can unlock access across the platform without making every interaction feel repetitive.",
    accent: C.blue,
    className: "about-bento-small about-bento-cursor",
  },
  {
    title: "Discount Discovery",
    text: "Offers should be easy to scan by need, location, and lifestyle instead of buried across separate channels.",
    accent: C.violet,
    className: "about-bento-hero about-bento-planet",
  },
  {
    title: "Partner Network",
    text: "StudentVerse creates a cleaner bridge between local brands and verified student audiences.",
    accent: C.orange,
    className: "about-bento-half about-bento-radar",
  },
  {
    title: "SV Orbit Guidance",
    text: "SV Orbit can help turn broad intent into useful recommendations across deals, places, and student needs.",
    accent: C.cyan,
    className: "about-bento-half about-bento-grid-card",
  },
];

function PrinciplesSection() {
  return (
    <CenterSection kicker="What Guides Us" title="A useful student platform.">
      <div
        className="about-bento-grid"
      >
        {PRINCIPLES.map((item) => (
          <div
            key={item.title}
            className={`about-bento-card ${item.className}`}
            style={{ "--accent": item.accent }}
          >
            <h3 className="sv-card-title">{item.title}</h3>
            <p className="sv-card-copy">{item.text}</p>
          </div>
        ))}
      </div>
    </CenterSection>
  );
}

const FAQS = [
  { q: "What is StudentVerse?", a: "StudentVerse helps university students discover student discounts, rewards, and useful opportunities in one place." },
  { q: "Who can join StudentVerse?", a: "StudentVerse is built for university students with valid student status." },
  { q: "Is StudentVerse free to use?", a: "Yes. StudentVerse is designed to be accessible for students." },
  { q: "How does student verification work?", a: "Students verify their student status so offers can be redeemed through a trusted student-only experience." },
  { q: "What is SV Orbit AI?", a: "SV Orbit AI is an assistant that helps students find relevant offers and navigate StudentVerse faster." },
  { q: "How can brands partner with StudentVerse?", a: "Brands can contact StudentVerse to create student-focused offers, rewards, and partnership campaigns." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <CenterSection id="faq-about" title="Frequently Asked Questions">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: 820, margin: "40px auto 0" }}>
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              style={{
                background: "rgba(0,0,0,0.55)",
                border: `1px solid ${isOpen ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)"}`,
                borderRadius: 14,
                overflow: "hidden",
                transition: "border-color .25s ease",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "1.2rem 1.4rem",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  color: "#fff",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "1rem", textAlign: "left" }}>{faq.q}</span>
                <span style={{ color: "rgba(255,255,255,.46)", fontSize: "1.3rem", lineHeight: 1 }}>{isOpen ? "-" : "+"}</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ padding: "0 1.4rem 1.25rem", color: "rgba(255,255,255,.68)", fontSize: ".96rem", lineHeight: 1.72, textAlign: "left" }}>
                  {faq.a}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </CenterSection>
  );
}

const JOURNEY = [
  { title: "Research", text: "Understanding student spending problems and discount access.", accent: C.blue },
  { title: "Platform", text: "Building the core StudentVerse web and app experience.", accent: C.orange },
  { title: "SV Orbit", text: "Adding AI-assisted discovery for relevant offers.", accent: C.violet },
  { title: "Mobile", text: "Expanding into a mobile-first student experience.", accent: C.cyan },
];

function JourneySection() {
  return (
    <CenterSection title="Our Journey" style={{ paddingBottom: "clamp(92px, 12vw, 140px)" }}>
      <div className="about-roadmap">
        <svg className="about-roadmap-path" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M80 250 C190 80 320 310 430 165 C545 15 650 200 760 130 C850 72 900 180 935 285" />
        </svg>
        {JOURNEY.map((item, index) => (
          <div key={item.title} className={`about-roadmap-stop stop-${index}`} style={{ "--accent": item.accent }}>
            <span className="about-roadmap-dot" />
            <div className="about-roadmap-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
        <div className="about-roadmap-x" aria-hidden="true">X</div>
      </div>
    </CenterSection>
  );
}

const TEAM_ITEMS = [
  "Sanjar Ghazanfar", "Mohamed Elkhouly", "Sara Carla Kader", "Mohammed Ayaan Khan",
  "Muhammad Finan", "Muhammad Moiz", "Hadi Wehbe", "Arshia Najafi",
  "Arina Mashkova", "Suwathi Rajasekar", "Mohamed Amin", "Dwayne Dcruz",
  "Arina Zhutaeva", "Khadija El Janati", "Luqman Ghazanfar", "Aman Sivad",
  "Aryan Narayanan", "Summer Rex",
].map((name, index) => ({
  node: <span style={{ fontSize: "1rem", fontWeight: 400, color: index % 2 ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.56)", whiteSpace: "nowrap" }}>{name}</span>,
}));
const TEAM_ITEMS_R = [...TEAM_ITEMS].reverse();

function TeamSection() {
  return (
    <section style={{ position: "relative", padding: "88px 0 96px", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem", padding: "0 20px" }}>
        <h2 style={{ fontSize: "clamp(3.5rem,9vw,7rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", background: "linear-gradient(315deg,#999,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Contributors
        </h2>
      </div>
      <LogoLoop logos={TEAM_ITEMS} speed={60} direction="left" logoHeight={28} gap={48} hoverSpeed={15} ariaLabel="Team members" />
      <div style={{ marginTop: "1.5rem" }}>
        <LogoLoop logos={TEAM_ITEMS_R} speed={60} direction="right" logoHeight={28} gap={48} hoverSpeed={15} ariaLabel="Team members row 2" />
      </div>
    </section>
  );
}

export default function About() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <AboutIntroSection />
      <OfferStatsSection />
      <FAQSection />
      <JourneySection />
      <TeamSection />
      <MainFooter />
      <PartnerBanner />
      <style>{`
        .about-title-section {
          position: relative;
          min-height: 285px;
          display: grid;
          place-items: end center;
          padding: 128px 20px 50px;
          overflow: hidden;
        }

        .about-title-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.35), transparent 62%);
          pointer-events: none;
        }

        .about-title-inner {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .about-title-inner h1 {
          margin: 0;
          color: #f7f8ff;
          font-size: clamp(3.1rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .about-reference-section {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: clamp(54px, 8vw, 86px) 0;
        }

        .about-reference-section:first-of-type {
          padding-top: clamp(128px, 14vw, 170px);
        }

        .about-intro-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(32px, 6vw, 72px);
          align-items: center;
          justify-items: center;
        }

        .about-preview-panel {
          min-height: 310px;
          border-radius: 2px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 22%, rgba(41,98,255,0.16), transparent 36%),
            linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018)),
            rgba(2,5,14,0.92);
          border: 1px solid rgba(255,255,255,0.08);
          display: grid;
          place-items: center;
        }

        .about-preview-panel img {
          width: min(92%, 520px);
          height: auto;
          display: block;
          filter: drop-shadow(0 28px 48px rgba(0,0,0,0.34));
        }

        .about-intro-copy {
          text-align: center;
          max-width: 760px;
        }

        .about-intro-copy h2 {
          margin: 0 0 18px;
          color: #f7f8ff;
          font-size: clamp(2.2rem, 4.5vw, 4.1rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.035em;
        }

        .about-intro-copy > p:not(.sv-kicker) {
          margin: 0 0 16px;
          color: rgba(255,255,255,0.66);
          font-size: 1rem;
          line-height: 1.78;
        }

        .about-manual-note {
          color: rgba(255,255,255,0.38) !important;
          font-size: 0.86rem !important;
          font-style: italic;
        }

        .about-contact-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          margin-top: 10px;
          padding: 0 22px;
          border-radius: 999px;
          background: #f7f8ff;
          color: #050711;
          font-weight: 800;
          font-size: 0.88rem;
          text-decoration: none;
        }

        .about-offer-section {
          padding-top: clamp(36px, 5vw, 56px);
        }

        .about-offer-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
          gap: clamp(36px, 7vw, 90px);
          align-items: center;
        }

        .about-offer-copy h2 {
          margin: 0 0 14px;
          color: #f7f8ff;
          font-size: clamp(2rem, 4.8vw, 4.2rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.035em;
        }

        .about-offer-copy > p {
          max-width: 620px;
          margin: 0 0 30px;
          color: rgba(255,255,255,0.62);
          line-height: 1.75;
        }

        .about-offer-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .about-offer-row {
          position: relative;
          padding: 18px 0 18px 18px;
          text-align: left;
          border-left: 3px solid var(--accent);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .about-offer-row-head {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 0;
          color: #f7f8ff;
          font-weight: 800;
          font-size: 1.05rem;
        }

        .about-offer-row p {
          margin: 8px 0 0;
          color: rgba(255,255,255,0.48);
          font-size: 0.92rem;
          line-height: 1.62;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px 24px;
          align-items: center;
        }

        .about-stat-item {
          min-height: 124px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .about-stat-number {
          display: inline-flex;
          align-items: center;
          color: #f7f8ff;
          line-height: 0.95;
        }

        .about-stat-number > span {
          margin-left: 2px;
          color: #f7f8ff;
          font-size: 56px;
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          transform: translateY(-2px);
        }

        .about-stat-label {
          margin-top: 10px;
          color: rgba(255,255,255,0.52);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .about-stat-note {
          grid-column: 1 / -1;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: left;
        }

        .about-stat-note span {
          color: rgba(255,255,255,0.7);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .about-stat-note p {
          max-width: 440px;
          margin: 8px 0 0;
          color: rgba(255,255,255,0.42);
          font-size: 0.86rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .about-title-section { min-height: 245px; padding-top: 112px; }
          .about-intro-grid,
          .about-offer-grid { grid-template-columns: 1fr; }
          .about-intro-copy { max-width: 760px; text-align: center; }
          .about-offer-copy { text-align: center; }
          .about-offer-copy > p { margin-left: auto; margin-right: auto; }
          .about-stats-grid { max-width: 560px; margin: 0 auto; }
          .about-simple-grid,
          .about-bento-grid { grid-template-columns: 1fr !important; }
          .about-bento-small,
          .about-bento-hero,
          .about-bento-half { grid-column: auto !important; }
          .about-roadmap { min-height: 780px !important; }
          .about-roadmap-path { display: none !important; }
          .about-roadmap-stop { position: static !important; transform: none !important; margin: 0 auto 22px; }
          .about-roadmap-x { position: static !important; margin: 18px auto 0; }
        }

        @media (max-width: 560px) {
          .about-reference-section { width: min(100% - 28px, 1180px); }
          .about-preview-panel { min-height: 250px; }
          .about-stats-grid { grid-template-columns: 1fr; gap: 14px; }
          .about-stat-item {
            min-height: 112px;
            text-align: center;
            align-items: center;
          }
          .about-stat-note { text-align: center; }
          .about-stat-note p { margin-left: auto; margin-right: auto; }
        }

        .about-native-hero {
          width: min(1080px, 100%);
          margin: 0 auto;
          position: relative;
          padding: 0;
        }

        .about-native-hero::before {
          content: "";
          position: absolute;
          top: -60px;
          bottom: -80px;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent, rgba(79, 126, 255, 0.9), transparent);
          box-shadow: 0 0 34px rgba(41, 98, 255, 0.7);
          opacity: 0.42;
          pointer-events: none;
        }

        .about-hero-copy {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-pill {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 0 14px;
          border-radius: 999px;
          color: rgba(255,255,255,0.72);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0 0 18px;
        }

        .about-hero-copy h1 {
          margin: 0 0 22px;
          font-size: clamp(3rem, 7vw, 6.7rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.045em;
        }

        .about-hero-copy h1 span {
          display: block;
          background: linear-gradient(315deg, #9ca3b8, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-hero-copy p:last-child {
          max-width: 710px;
          margin: 0 auto;
          color: rgba(255,255,255,0.64);
          font-size: clamp(1rem, 1.8vw, 1.14rem);
          line-height: 1.74;
        }


        .about-bento-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: minmax(250px, auto);
          gap: 16px;
          margin-top: 42px;
        }

        .about-bento-card {
          position: relative;
          overflow: hidden;
          min-height: 250px;
          padding: clamp(24px, 3vw, 34px);
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.11);
          background:
            radial-gradient(circle at 18% 16%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.026)),
            rgba(4, 7, 18, 0.86);
          text-align: left;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .about-bento-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.34;
          background-image:
            radial-gradient(circle at 12% 18%, rgba(255,255,255,0.5) 0 1px, transparent 1.5px),
            radial-gradient(circle at 48% 26%, rgba(255,255,255,0.35) 0 1px, transparent 1.5px),
            radial-gradient(circle at 74% 66%, rgba(255,255,255,0.42) 0 1px, transparent 1.5px),
            radial-gradient(circle at 88% 18%, rgba(255,255,255,0.28) 0 1px, transparent 1.5px);
          pointer-events: none;
        }

        .about-bento-card::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }

        .about-bento-card .sv-card-title,
        .about-bento-card .sv-card-copy {
          position: relative;
          z-index: 2;
          max-width: 460px;
        }

        .about-bento-small {
          grid-column: span 2;
        }

        .about-bento-hero {
          grid-column: span 4;
        }

        .about-bento-half {
          grid-column: span 3;
        }

        .about-bento-hero .sv-card-title {
          font-size: clamp(2rem, 4vw, 3rem);
          max-width: 520px;
        }

        .about-bento-hero .sv-card-copy {
          font-size: 1rem;
          max-width: 520px;
        }

        .about-bento-planet::after {
          right: -70px;
          bottom: -125px;
          width: min(380px, 42vw);
          height: min(380px, 42vw);
          border-radius: 999px;
          background:
            radial-gradient(circle at 34% 26%, rgba(255,255,255,0.46), transparent 0 9%, transparent 10%),
            radial-gradient(circle at 34% 30%, color-mix(in srgb, var(--accent) 92%, #ffffff), color-mix(in srgb, var(--accent) 52%, #000000) 54%, rgba(0,0,0,0.08) 72%);
          opacity: 0.82;
          filter: saturate(0.92);
        }

        .about-bento-planet .sv-card-title,
        .about-bento-planet .sv-card-copy {
          max-width: 52%;
        }

        .about-bento-planet::before {
          opacity: 0.48;
        }

        .about-bento-radar {
          background:
            radial-gradient(circle at 58% 18%, rgba(255,255,255,0.05), transparent 0 8%, transparent 9%),
            repeating-radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0 1px, transparent 1px 44px),
            linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.024)),
            rgba(4, 7, 18, 0.86);
        }

        .about-bento-radar::after {
          right: 34px;
          top: 44px;
          width: 220px;
          height: 72px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025));
          opacity: 0.72;
        }

        .about-bento-grid-card {
          background:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.024)),
            rgba(4, 7, 18, 0.86);
          background-size: 44px 44px, 44px 44px, auto, auto;
        }

        .about-bento-grid-card::after {
          right: 32px;
          bottom: 30px;
          width: 140px;
          height: 52px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--accent) 22%, rgba(255,255,255,0.06));
          border: 1px solid color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.1));
        }

        .about-bento-cursor::after {
          right: 32px;
          top: 42px;
          width: 116px;
          height: 54px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--accent) 24%, rgba(255,255,255,0.08));
          border: 1px solid color-mix(in srgb, var(--accent) 32%, rgba(255,255,255,0.1));
        }

        @media (max-width: 700px) {
          .about-bento-planet .sv-card-title,
          .about-bento-planet .sv-card-copy {
            max-width: none;
          }
          .about-bento-planet::after {
            opacity: 0.24;
          }
        }

        .about-roadmap {
          width: min(980px, 100%);
          min-height: 420px;
          margin: 44px auto 0;
          position: relative;
        }

        .about-roadmap-path {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .about-roadmap-path path {
          fill: none;
          stroke: rgba(255,255,255,0.34);
          stroke-width: 3;
          stroke-dasharray: 12 18;
          stroke-linecap: round;
        }

        .about-roadmap-stop {
          position: absolute;
          width: min(220px, 46vw);
          text-align: center;
        }

        .stop-0 { left: 2%; top: 54%; }
        .stop-1 { left: 28%; top: 18%; }
        .stop-2 { left: 54%; top: 43%; }
        .stop-3 { right: 5%; top: 18%; }

        .about-roadmap-dot {
          display: block;
          width: 18px;
          height: 18px;
          margin: 0 auto 12px;
          border-radius: 999px;
          background: var(--accent);
          border: 3px solid rgba(0,0,0,0.7);
        }

        .about-roadmap-card {
          padding: 18px;
          border-radius: 18px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .about-roadmap-card h3 {
          margin: 0 0 8px;
          color: #fff;
          font-size: 1rem;
        }

        .about-roadmap-card p {
          margin: 0;
          color: rgba(255,255,255,0.62);
          font-size: 0.9rem;
          line-height: 1.58;
        }

        .about-roadmap-x {
          position: absolute;
          right: 1%;
          bottom: 4%;
          width: 74px;
          height: 74px;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.86);
          font-size: 3.8rem;
          font-weight: 900;
          transform: rotate(-10deg);
        }

        @media (max-width: 640px) {}
      `}</style>
    </div>
  );
}
