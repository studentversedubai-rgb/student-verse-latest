import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if animation has already played in this session
    const animated = sessionStorage.getItem('heroAnimated');
    if (animated) {
      setHasAnimated(true);
      setIsReady(true);
    } else {
      // Small delay to ensure smooth initial render
      requestAnimationFrame(() => {
        setIsReady(true);
      });
      sessionStorage.setItem('heroAnimated', 'true');
    }
  }, []);

  return (
    <>
      {/* Empty div for spacing - responsive */}
      <div style={{ height: 'clamp(10px, 3vw, 40px)' }} className="empty-div"></div>

      <div className="section">
        <div className="container">
          <div className="home-v3-hero-section">
          </div>

          {/* Hero Center Content */}
          <div className="hero-section-center-holder" style={{ gap: '1rem', opacity: isReady ? 1 : 0 }}>
            <div className="hero-center-text" style={{ marginBottom: '0.5rem' }}>
              <motion.h1
                className="gradient-title"
                initial={hasAnimated ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.3
                }}
              >
                UNLOCK <br /> STUDENT DISCOUNTS
              </motion.h1>
            </div>

            <div className="center-hero-paragraph-holder">
              <motion.h3
                initial={hasAnimated ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.5
                }}
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  textAlign: "center"
                }}
              >
                VERIFY. DISCOVER. REDEEM.
              </motion.h3>
            </div>

            <div className="form-block hero-form w-form" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <form
                className="form-holder"
                data-name="Early Access Emails"
                data-wf-element-id="34e446c1-e739-20c5-2b6f-f78302acc646"
                data-wf-page-id="66a92b76e1155b1f28fde156"
                id="Early-Access-Emails"
                method="get"
                name="wf-form-Early-Access-Emails"
                style={{ margin: 0 }}
              >
                <motion.div
                  initial={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.7
                  }}
                  style={{ margin: 0 }}
                >
                  <div
                    className="coming-soon-text"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      padding: "1rem 2.5rem",
                      borderRadius: "50px",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.5px",
                      color: "rgba(255, 255, 255, 0.6)",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      cursor: "default"
                    }}
                  >
                    Coming Soon
                  </div>
                </motion.div>
              </form>
              <div id="brands-homepage"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}