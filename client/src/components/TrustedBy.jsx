import { motion } from 'framer-motion';
import LogoLoop from './LogoLoop';

export default function TrustedBy() {
  const logos = [
    { src: "/assets/bikanervala.avif", alt: "Bikanervala" },
    { src: "/assets/centrepoint.svg", alt: "Centrepoint", needsWhiteBackground: true },
    { src: "/assets/B60.png", alt: "B60" },
    { src: "/assets/filli.png", alt: "Filli" },
    { src: "/assets/coffeeplannet.jpeg", alt: "Coffee Planet" },
    { src: "/assets/puranmal.png", alt: "Puranmal", needsWhiteBackground: true },
    { src: "/assets/westzone.png", alt: "Westzone" },
    { src: "/assets/raynatourslogo.png", alt: "Rayna Tours", needsWhiteBackground: true },
    { src: "/assets/sls.png", alt: "SLS" },
    { src: "/assets/max.webp", alt: "Max" }
  ];

  const renderLogoItem = (item) => {
    return (
      <img
        className={`h-20 w-auto block object-contain [-webkit-user-drag:none] pointer-events-none [image-rendering:-webkit-optimize-contrast] motion-reduce:transition-none transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120 ${
          item.needsWhiteBackground 
            ? 'bg-white rounded-lg px-3 py-2 shadow-sm' 
            : ''
        }`}
        src={item.src}
        alt={item.alt ?? ''}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  };

  return (
    <motion.div 
      className="trusted-by" 
      style={{ paddingBottom: '20px' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="center-text">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>Join students saving smarter with these brands</p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
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
            renderItem={renderLogoItem}
          />
          
          <div className="partner-banner-aurora"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}