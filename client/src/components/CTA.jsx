import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CTA() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="section overflow-hidden" style={{ marginTop: '0', paddingTop: '40px', marginBottom: '0' }}>
      <div className="container " style={{ position: 'relative', zIndex: 1 }}>
        <div className="cta-container" >
          <motion.div
            className="cta-form-holder"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="cta-heading-holder">
              <motion.div
                className="cta-heading-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <motion.div
                  className="cta-heading fading-title"
                  style={{ textAlign: 'left', fontWeight: "bold" }}
                >
                  Ready to Start <span style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #2962ff 50%, #7b2cbf 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Saving?</span>
                </motion.div>
              </motion.div>
              <motion.div
                className="cta-paragraph-holder"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                <p style={{ margin: 0, padding: 0, listStyle: 'none' }}>Join thousands of students already saving big. Download StudentVerse and unlock exclusive discounts at 150+ partner brands today.</p>
              </motion.div>
            </div>

            <motion.div
              className="form-block w-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              {/* Coming Soon Button with no hover effect */}
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  padding: "1rem 2.5rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.5px",
                  background: "#333333",
                  color: "#888888",
                  cursor: "not-allowed",
                  border: "1px solid #444444",
                  pointerEvents: "none"
                }}
              >
                Coming Soon
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="cta-app-wrapper"

            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="hero-section-app-container-ct">
              <motion.div
                className="hero-section-phone-holder"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
               
                <div className="hero-section-phone-screenshot-holder">
                   
                </div>
              </motion.div>


            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
