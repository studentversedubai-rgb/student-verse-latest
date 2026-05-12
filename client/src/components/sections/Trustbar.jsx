import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';

const universities = [
  { src: "/assets/uowd.webp",    alt: "University of Wollongong" },
  { src: "/assets/aud.png",      alt: "AUD" },
  { src: "/assets/heriottwatt.png", alt: "Heriot-Watt" },
  { src: "/assets/amity.png",    alt: "Amity University" },
  { src: "/assets/AUSLOGO.png",  alt: "AUS" },
  { src: "https://www.cud.ac.ae/themes/indicud/media/logo/bigger/logo_svg.svg", alt: "Canadian University Dubai" },
];

export default function Trustbar() {
  return (
    <section style={{ padding: '60px 0', overflow: 'hidden' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center', fontSize: '0.75rem', fontWeight: 600,
          letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase', marginBottom: '2.5rem',
        }}
      >
        Trusted by students at top universities
      </motion.p>

      <LogoLoop
        logos={universities}
        speed={80}
        direction="left"
        logoHeight={52}
        gap={60}
        hoverSpeed={20}
        fadeOut
        fadeOutColor="transparent"
        ariaLabel="Partner universities"
      />
    </section>
  );
}
