import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What exactly is StudentVerse?",
      answer: "StudentVerse turns your student ID into SV Pay; tap to pay, get instant discounts, and make your student status work for you."
    },
    {
      id: 2,
      question: "Is StudentVerse free to join?",
      answer: "StudentVerse Starter is free with 5 redemptions. Upgrade to Pro or Pro+ for more perks, cashback, and exclusive features."
    },
    {
      id: 3,
      question: "Who can join StudentVerse?",
      answer: "StudentVerse is for university students, verifying your status to unlock exclusive discounts and financial tools."
    },
    {
      id: 4,
      question: "When will StudentVerse be available?",
      answer: "Launching Q1 2026 with a viral waitlist and MVP app featuring manual redemptions, before full automation later in the year."
    },
    {
      id: 5,
      question: "How does StudentVerse benefit my student life?",
      answer: "StudentVerse gives instant discounts, smart budgeting, activity planning, and rewards to unlock premium perks."
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
              >
                {faqs.map((faq) => (
                  <motion.div 
                    key={faq.id}
                    className={`ease-faq-container-01 ${openFAQ === faq.id ? 'is-open' : ''}`}
                    variants={itemVariants}
                    onClick={() => toggleFAQ(faq.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ease-faq">
                      <div className="ease-faq-title-holder">
                        <div className="ease-faq-title">{faq.question}</div>
                        <svg 
                          className="ease-faq-icon" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          style={{
                            transform: openFAQ === faq.id ? 'rotate(45deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path d="M12 5V19M5 12H19" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <div className="ease-faq-answer-holder">
                        <div className="ease-faq-answer">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
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