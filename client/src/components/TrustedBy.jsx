import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

export default function TrustedBy() {
  const logos = [
    { src: "/assets/bikanervala.avif", alt: "Bikanervala" },
    { src: "/assets/centrepoint.svg", alt: "Centrepoint" },
    { src: "/assets/B60.png", alt: "B60" },
    { src: "/assets/filli.png", alt: "Filli" },
    { src: "/assets/coffeeplannet.jpeg", alt: "Coffee Planet" },
    { src: "/assets/puranmal.png", alt: "Puranmal" },
    { src: "/assets/westzone.png", alt: "Westzone" },
    { src: "/assets/raynatourslogo.png", alt: "Rayna Tours" },
    { src: "/assets/sls.png", alt: "SLS" },
    { src: "/assets/max.webp", alt: "Max" }
  ];

  return (
    <div className="trusted-by" style={{ paddingBottom: '20px' }}>
      <div className="center-text">
        <motion.div 
          className="fade-in-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>Join students saving smarter with these brands</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="fade-in-on-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="company-logo-holder" style={{ position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={logos}
            speed={120}
            direction="left"
            logoHeight={80}
            gap={60}
            hoverSpeed={20}
            fadeOut
            fadeOutColor="#000000"
            scaleOnHover
            ariaLabel="Partner brands"
          />
          
          <div className="partner-banner-aurora"></div>
        </div>
      </motion.div>
    </div>
  );
}