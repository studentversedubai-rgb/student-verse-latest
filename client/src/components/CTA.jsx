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
              <div className="cta-heading-wrapper">
                <motion.div
                  className="cta-heading fading-title"
                  style={{ textAlign: 'left', fontWeight: "bold" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  Get Started with StudentVerse
                </motion.div>
              </div>
              <motion.div
                className="cta-paragraph-holder"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                <p>Bigger savings. Smarter students. StudentVerse starts here. Unlock deals made for student life.</p>
              </motion.div>
            </div>

            <motion.div
              className="form-block w-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <form
                className="form-holder"
                data-name="Early Access Emails"
                data-wf-element-id="8ed71055-6ae7-5324-a6d4-54fc76e0e2eb"
                data-wf-page-id="66a92b76e1155b1f28fde156"
                id="Early-Access-Emails"
                method="get"
                name="wf-form-Early-Access-Emails"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start"

                }}
              >
                {/* Animated RGB Border Button */}
                <div className="relative rounded-full overflow-visible inline-block">
                  {/* Animated gradient border orbit - same as BentoDashboard */}
                  <div className="absolute -inset-[2px] rounded-full opacity-80">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                        backgroundSize: "300% 300%"
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "300% 50%"]
                      }}
                      transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity
                      }}
                    />
                    {/* Soft multi-color glow effect */}
                    <div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{
                        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                      }}
                    />
                  </div>

                  {/* Button with black background */}
                  <Link
                    className="join-waitlist-button relative bg-black rounded-full border-2 border-transparent z-10"
                    to="/waitlist"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      padding: "1rem 2.5rem",
                      textDecoration: "none",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.5px",
                      color: "white"
                    }}
                  >
                    {isAuthenticated ? "View Dashboard" : "Join the UNI-verse"}
                  </Link>
                </div>
              </form>

              <div className="thank-you-message w-form-done">
                <div>
                  <span className="white-text">Thank you! </span><br />
                  Your submission has been received!
                </div>
              </div>

              <div className="error-message w-form-fail">
                <div>
                  <span className="white-text">Oops! <br /></span>
                  Something went wrong! Try again later
                </div>
              </div>
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
                <img
                  alt="iPhone mockup"
                  className="hero-section-phone-image"
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a92b76e1155b1f28fde227_Apple%20Iphone%2014%20pro.png"
                />
                <div className="hero-section-phone-screenshot-holder">
                  <img
                    alt="App interface"
                    className="hero-section-phone-screenshot-image"
                    loading="lazy"
                    src="/assets/UI.jpeg"
                  />
                </div>
              </motion.div>


            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}