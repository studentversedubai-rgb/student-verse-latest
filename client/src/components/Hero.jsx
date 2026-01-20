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

            {/* Hero App Section */}
            <motion.div
              className="hero-v3-app"
              initial={hasAnimated ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
            >
              <div className="hero-section-app-container">
                <div className="hero-section-phone-holder">
                  <img
                    alt="iPhone mockup"
                    className="hero-section-phone-image"
                    loading="lazy"
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a92b76e1155b1f28fde227_Apple%20Iphone%2014%20pro.png"
                  />
                  <div className="hero-section-phone-screenshot-holder">
                    <img
                      alt="App screenshot"
                      className="hero-section-phone-screenshot-image"
                      loading="lazy"
                      src="/assets/Uis.jpeg"
                      sizes="(max-width: 479px) 500px, (max-width: 767px) 800px, (max-width: 991px) 1080px, 1179px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Circles */}
            <motion.div
              className="hero-circles-wrapper-v3"
              initial={hasAnimated ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1
              }}
            >
              <div className="hero-circle-wrapper _01 center-circle">
                <img
                  alt="Background circle 1"
                  className="hero-circle"
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938caa62c8b5f7aaf5ad7_Circles%20(2).png"
                />
              </div>

              <div className="w-layout-vflex hero-circle-wrapper _02 center-circle">
                <img
                  alt="Background circle 2"
                  className="hero-circle-02"
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938ca8d17e84d6ed8613e_Circles%20(3).png"
                />
              </div>

              <div className="hero-circle-wrapper _03 center-circle">
                <img
                  alt="Background circle 3"
                  className="hero-circle-03 mobile-enhanced-opacity"
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938cab78e7525914d0f9f_Circles%20(1).png"
                />
              </div>
            </motion.div>
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
                  <Link
                    className="join-waitlist-button"
                    to="/waitlist"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      padding: "1rem 2.5rem",
                      borderRadius: "50px",
                      textDecoration: "none",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {isAuthenticated ? "View Dashboard" : "Join The UNI-verse"}
                  </Link>
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