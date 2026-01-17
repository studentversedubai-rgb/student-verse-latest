import React from 'react';
import { motion } from 'framer-motion';

export default function TrustedBy() {
  const logos = [
    { src: "/assets/bikanervala.avif", alt: "Bikanervala" },
    { src: "/assets/centrepoint.svg", alt: "Centrepoint", className: "background-logo" },
    { src: "/assets/B60.png", alt: "B60" },
    { src: "/assets/filli.png", alt: "Filli" },
    { src: "/assets/coffeeplannet.jpeg", alt: "Coffee Planet" },
    { src: "/assets/puranmal.png", alt: "Puranmal", className: "background-logo" },
    { src: "/assets/westzone.png", alt: "Westzone" },
    { src: "/assets/raynatourslogo.png", alt: "Rayna Tours", className: "background-logo" },
    { src: "/assets/sls.png", alt: "SLS" },
    { src: "/assets/max.webp", alt: "Max" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="trusted-by">
      <div className="center-text">
        <motion.div 
          className="fade-in-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p>Join students saving smarter with these brands</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="fade-in-on-scroll"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="company-logo-holder">
          {/* First row of logos */}
          <div className="company-logo-container">
            {logos.map((logo, index) => (
              <motion.div 
                key={`first-${index}`}
                className="company-logo-wrapper"
                variants={itemVariants}
              >
                <img 
                  alt={logo.alt} 
                  className={`company-logo ${logo.className || ''}`}
                  loading="lazy"
                  src={logo.src} 
                />
              </motion.div>
            ))}
          </div>
          
          {/* Second row of logos (duplicate for scrolling effect) */}
          <div className="company-logo-container">
            {logos.map((logo, index) => (
              <motion.div 
                key={`second-${index}`}
                className="company-logo-wrapper"
                variants={itemVariants}
              >
                <img 
                  alt={logo.alt} 
                  className={`company-logo ${logo.className || ''}`}
                  loading="lazy"
                  src={logo.src === "/assets/coffeeplannet.jpeg" ? "/assets/coffeeplannet.png" : logo.src}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="graident-for-logos"></div>
          <div className="graident-for-logos right"></div>
          <div className="partner-banner-aurora"></div>
        </div>
      </motion.div>
    </div>
  );
}