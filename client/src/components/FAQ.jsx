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
                <div style={{ margin: "0", padding: "0", textAlign: "center" }}>
                  <div className="section-title xl">
                    <motion.div 
                      className="fade-in-on-scroll"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <h2 className="fading-title">StudentVerse FAQs</h2>
                    </motion.div>
                  </div>
                  
                  <div className="section-paragraph">
                    <motion.div 
                      className="fade-in-on-scroll"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                      <p>Get quick answers to your questions about StudentVerse and saving as a student.</p>
                    </motion.div>
                  </div>
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