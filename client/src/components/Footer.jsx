import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
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
    <div className="section">
      <div className="container">
        <motion.div 
          className="footer-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Link className="footer-brand w-inline-block" to="/">
              <img 
                alt="StudentVerse Logo" 
                className="footer-brand-image" 
                loading="lazy" 
                src="/assets/svlogo.png" 
              />
              <div className="footer-heading">
                Simplify your student life with StudentVerse.
              </div>
              <div className="footer-paragraph-holder"></div>
            </Link>
          </motion.div>
          
          <motion.div 
            className="footer-content"
            variants={containerVariants}
          >
            <motion.div 
              className="footer-block" 
              id="w-node-e92bf484-a605-4132-f141-4518468af7ef-468af7d9"
              variants={itemVariants}
            >
              <div className="title-small">Social media</div>
              <motion.a 
                className="footer-link"
                href="https://www.instagram.com/studentverse.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5, color: "#00F0FF" }}
                transition={{ duration: 0.2 }}
              >
                Instagram
              </motion.a>
              <motion.a 
                className="footer-link"
                href="https://www.linkedin.com/company/studentverseofficial/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5, color: "#00F0FF" }}
                transition={{ duration: 0.2 }}
              >
                Linkedin
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="footer-block" 
              id="w-node-e92bf484-a605-4132-f141-4518468af7fa-468af7d9"
              variants={itemVariants}
            >
              <div className="title-small">Student &amp; Support</div>
              <motion.a 
                className="footer-link" 
                href="/about#faq-about"
                whileHover={{ x: 5, color: "#00F0FF" }}
                transition={{ duration: 0.2 }}
              >
                FAQs
              </motion.a>
              <Link 
                className="footer-link" 
                to="/contact"
              >
                <motion.span
                  whileHover={{ x: 5, color: "#00F0FF" }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "inline-block" }}
                >
                  Connect with US
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}