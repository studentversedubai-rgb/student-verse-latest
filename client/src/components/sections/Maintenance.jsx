import { motion } from "framer-motion";
import { Instagram, Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <section style={styles.section} aria-label="Maintenance notice">
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div style={styles.iconWrap}>
          <Wrench size={36} />
        </div>

        <motion.p
          style={styles.kicker}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          Page Update
        </motion.p>

        <h1 style={styles.title}>This page is under maintenance.</h1>
        <p style={styles.copy}>
          We are working on this page right now. For any inquiries, reach out
          to us on Instagram and we will get back to you as soon as possible.
        </p>

        <a
          href="https://www.instagram.com/studentverse.ae/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.instagramLink}
        >
          <Instagram size={19} />
          Message us on Instagram
        </a>
      </motion.div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "80vh",
    display: "grid",
    placeItems: "center",
    padding: "clamp(7rem, 12vw, 9rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem)",
    position: "relative",
    zIndex: 1,
  },
  card: {
    width: "min(100%, 760px)",
    textAlign: "center",
    padding: "clamp(2rem, 6vw, 4rem)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    background:
      "radial-gradient(circle at 20% 0%, rgba(41,98,255,0.2), transparent 34%), radial-gradient(circle at 85% 20%, rgba(255,1,105,0.16), transparent 32%), linear-gradient(145deg, rgba(7,10,26,0.84), rgba(13,18,42,0.58))",
    boxShadow: "0 30px 90px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px) saturate(1.2)",
    WebkitBackdropFilter: "blur(18px) saturate(1.2)",
  },
  iconWrap: {
    width: "76px",
    height: "76px",
    margin: "0 auto 1.4rem",
    display: "grid",
    placeItems: "center",
    color: "#fff",
    borderRadius: "24px",
    background: "linear-gradient(135deg, #2962ff, #7b2cbf)",
    boxShadow: "0 18px 40px rgba(41,98,255,0.3)",
  },
  kicker: {
    margin: "0 0 0.75rem",
    color: "#00f0ff",
    fontSize: "0.78rem",
    fontWeight: 900,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0",
    color: "#fff",
    fontSize: "clamp(2.35rem, 6vw, 4.7rem)",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: 0,
  },
  copy: {
    maxWidth: "590px",
    margin: "1.2rem auto 0",
    color: "rgba(232,238,255,0.68)",
    fontSize: "clamp(1rem, 2vw, 1.15rem)",
    lineHeight: 1.75,
  },
  instagramLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.55rem",
    minHeight: "48px",
    marginTop: "2rem",
    padding: "0 1.2rem",
    borderRadius: "999px",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 850,
    textDecoration: "none",
    background: "linear-gradient(72.44deg, #ff7a00 11.92%, #ff0169 51.56%, #d300c5 85.69%)",
    boxShadow: "0 16px 36px rgba(255,1,105,0.28)",
  },
};
