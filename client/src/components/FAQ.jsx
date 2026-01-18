import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What exactly is StudentVerse?",
      answer: "StudentVerse turns your student ID into instant savings; scan a QR code to redeem exclusive deals, unlock student-only discounts, and make your student status work for you.",
      color: "#00b8cc" // Cyan
    },
    {
      id: 2,
      question: "Is StudentVerse free to join?",
      answer: "StudentVerse Starter is free with 5 redemptions. Upgrade to Pro or Pro+ for more perks, cashback, and exclusive features.",
      color: "#cc8800" // Orange/Yellow
    },
    {
      id: 3,
      question: "Who can join StudentVerse?",
      answer: "StudentVerse is for university students, verifying your status to unlock exclusive discounts and financial tools.",
      color: "#9a1f5a" // Purple/Pink
    },
    {
      id: 4,
      question: "When will StudentVerse be available?",
      answer: "Launching Q1 2026 with a viral waitlist and MVP app featuring manual redemptions, before full automation later in the year.",
      color: "#00b8cc" // Cyan (alternating)
    },
    {
      id: 5,
      question: "How does StudentVerse benefit my student life?",
      answer: "StudentVerse gives instant discounts, smart budgeting, activity planning, and rewards to unlock premium perks.",
      color: "#cc8800" // Orange/Yellow (alternating)
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
    <div style={{ padding: "0", margin: "0" }}>
      <div className="container">
        <div style={{ padding: "0", margin: "0" }}>
          <div className="section-center-text">
            <div className="section-title xl"></div>
          </div>
          
          <div id="faq-about">
            <div style={{ padding: "0", margin: "0" }}>
              <div className="container">
                <div style={{ margin: "0", padding: "0", textAlign: "center", width: "100%" }}>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 5rem)',
                      fontWeight: '700',
                      background: 'linear-gradient(315deg, #999, #fff)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '1.5rem',
                      lineHeight: '1.1'
                    }}
                  >
                    StudentVerse FAQs
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    style={{
                      fontSize: "1.3rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      maxWidth: "600px",
                      margin: "0 auto",
                      lineHeight: "1.6"
                    }}
                  >
                    Get quick answers to your questions about StudentVerse and saving as a student.
                  </motion.p>
                </div>
              </div>
              
              <motion.div 
                className="faq-holder"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  maxWidth: "900px",
                  margin: "0 auto",
                  padding: "2rem 1rem"
                }}
              >
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={faq.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    style={{ 
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <ElectricBorder
                      color={faq.color}
                      speed={1.2}
                      chaos={0.08}
                      borderRadius={16}
                      style={{ 
                        position: 'relative'
                      }}
                    >
                      <motion.div 
                        className={`faq-card ${openFAQ === faq.id ? 'is-open' : ''}`}
                        onClick={() => toggleFAQ(faq.id)}
                        style={{
                          background: 'rgba(8, 12, 31, 0.95)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          borderRadius: '16px',
                          padding: '1.5rem 2rem',
                          position: 'relative',
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'background 0.3s ease',
                          minHeight: '80px',
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                        whileHover={{
                          background: 'rgba(8, 12, 31, 0.98)',
                          transition: { duration: 0.2 }
                        }}
                      >
                        {/* Subtle glow effect */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `radial-gradient(circle at 50% 0%, ${faq.color}15 0%, transparent 50%)`,
                            pointerEvents: 'none',
                            opacity: openFAQ === faq.id ? 1 : 0.5,
                            transition: 'opacity 0.3s ease'
                          }}
                        />
                        
                        <div className="faq-header" style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          position: 'relative',
                          zIndex: 1,
                          flexShrink: 0
                        }}>
                          <motion.h3 
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                              fontWeight: '600',
                              margin: 0,
                              lineHeight: '1.4',
                              flex: 1,
                              paddingRight: '1rem'
                            }}
                            animate={{
                              color: openFAQ === faq.id ? faq.color : '#ffffff'
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {faq.question}
                          </motion.h3>
                          
                          <motion.div
                            animate={{
                              rotate: openFAQ === faq.id ? 45 : 0,
                              scale: openFAQ === faq.id ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: `rgba(${faq.color === '#00b8cc' ? '0, 184, 204' : faq.color === '#cc8800' ? '204, 136, 0' : '154, 31, 90'}, 0.2)`,
                              border: `1px solid ${faq.color}40`,
                              flexShrink: 0
                            }}
                          >
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none"
                            >
                              <path 
                                d="M12 5V19M5 12H19" 
                                stroke={faq.color} 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="faq-answer"
                          initial={false}
                          animate={{
                            height: openFAQ === faq.id ? 'auto' : 0,
                            opacity: openFAQ === faq.id ? 1 : 0,
                            marginTop: openFAQ === faq.id ? '1.5rem' : 0
                          }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: { duration: openFAQ === faq.id ? 0.3 : 0.2, delay: openFAQ === faq.id ? 0.1 : 0 }
                          }}
                          style={{
                            overflow: 'hidden',
                            position: 'relative',
                            zIndex: 1
                          }}
                        >
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                            lineHeight: '1.6',
                            margin: 0,
                            fontWeight: '400'
                          }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    </ElectricBorder>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}