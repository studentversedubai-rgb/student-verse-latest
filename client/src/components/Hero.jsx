import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {/* Empty div for spacing */}
      <div style={{ height: '100px' }} className="empty-div"></div>
      
      <div className="section">
        <div className="container">
          <div className="home-v3-hero-section">
            
            {/* Hero App Section */}
            <div className="hero-v3-app">
              <motion.div 
                className="animate-on-load-01"
                initial={{
                  y: 30,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
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
            </div>

            {/* Hero Circles */}
            <div className="hero-circles-wrapper-v3">
              <div className="hero-circle-wrapper _01 center-circle">
                <motion.img 
                  alt="Background circle 1" 
                  className="hero-circle" 
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938caa62c8b5f7aaf5ad7_Circles%20(2).png"
                  initial={{
                    y: 140,
                    scale: 0,
                    opacity: 0,
                    filter: "blur(20px)"
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.4
                  }}
                />
              </div>
              
              <div className="w-layout-vflex hero-circle-wrapper _02 center-circle">
                <motion.img 
                  alt="Background circle 2" 
                  className="hero-circle-02"
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938ca8d17e84d6ed8613e_Circles%20(3).png"
                  initial={{
                    y: 213,
                    scale: 0,
                    opacity: 0,
                    filter: "blur(20px)"
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.6
                  }}
                />
              </div>
              
              <div className="hero-circle-wrapper _03 center-circle">
                <motion.img 
                  alt="Background circle 3" 
                  className="hero-circle-03 mobile-enhanced-opacity" 
                  loading="lazy"
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a938cab78e7525914d0f9f_Circles%20(1).png"
                  initial={{
                    y: 280,
                    scale: 0,
                    opacity: 0,
                    filter: "blur(20px)"
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.8
                  }}
                />
              </div>
            </div>
          </div>

          {/* Hero Center Content */}
          <div className="hero-section-center-holder">
            <div className="hero-center-text">
              <motion.h1 
                className="gradient-title"
                initial={{ y: 50, opacity: 0 }}
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
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.5
                }}
              >
                VERIFY. DISCOVER. REDEEM.
              </motion.h3>
            </div>
            
            <div className="form-block hero-form w-form">
              <form 
                className="form-holder" 
                data-name="Early Access Emails"
                data-wf-element-id="34e446c1-e739-20c5-2b6f-f78302acc646" 
                data-wf-page-id="66a92b76e1155b1f28fde156"
                id="Early-Access-Emails" 
                method="get" 
                name="wf-form-Early-Access-Emails"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.7
                  }}
                >
                  <Link 
                    className="join-waitlist-button" 
                    to="/waitlist"
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