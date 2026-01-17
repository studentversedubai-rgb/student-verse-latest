import { motion } from 'framer-motion';

export default function Trustbar() {
  const universities = [
    { src: "/assets/uowd.webp", alt: "University of Wollongong" },
    { src: "/assets/aud.png", alt: "AUD" },
    { src: "/assets/heriottwatt.png", alt: "Heriot-Watt" },
    { src: "/assets/amity.png", alt: "Amity University", className: "large" },
    { src: "/assets/AUSLOGO.png", alt: "AUS", className: "large" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="trustbar is-visible"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{ 
        opacity: 1, 
        transform: 'translateY(0)',
        minHeight: '200px',
        display: 'block',
        visibility: 'visible',
        padding: '40px 20px'
      }}
    >
      <div className="trustbar-inner" style={{ opacity: 1, transform: 'translateY(0)', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.p 
          className="trustbar-kicker"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: '32px', textAlign: 'center' }}
        >
          LAUNCHING SOON AT TOP CAMPUSES
        </motion.p>
        
        <motion.div 
          className="trustbar-logos"
          variants={containerVariants}
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '24px',
            justifyItems: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {universities.map((university) => (
            <motion.div 
              key={university.alt}
              className={`trustbar-logo ${university.className || ''}`}
              variants={logoVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80px',
                width: '100%',
                padding: '12px'
              }}
            >
              <img 
                alt={university.alt} 
                src={university.src} 
                loading="lazy"
                style={{ 
                  maxHeight: university.className === 'large' ? '72px' : '60px',
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${university.src}`);
                  e.target.style.border = '1px solid red';
                }}
                onLoad={() => {
                  console.log(`Successfully loaded: ${university.src}`);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .trustbar-logos {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .trustbar-logos {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          .trustbar-logo img {
            max-height: 56px !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .trustbar-logos {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </motion.section>
  );
}