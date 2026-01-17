import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactHero() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    department: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <div className="section contact-v2">
      <div id="Connect-contact"></div>
      <div className="container">
        <div className="contact-v2-wrapper">
          <div className="hero-section-center-holder contact-v2">
            <motion.div 
              className="center-text paddings"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="section-title l">
                <motion.div 
                  className="animate-on-load-01"
                  variants={itemVariants}
                >
                  <h1 className="fading-title">Connect with Us</h1>
                </motion.div>
                <motion.div 
                  className="animate-on-load-02"
                  variants={itemVariants}
                >
                  <div className="section-paragraph">
                    <p>Have a question or idea or just want to partner up? The StudentVerse team is ready to connect.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="animate-on-load-03"
              variants={formVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="colored-block">
                <motion.div 
                  className="animate-on-load-04"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                  <div className="contact-form-holder">
                    <div className="contact-form-block w-form">
                      {!isSubmitted && !isError && (
                        <motion.form 
                          className="contact-us-form" 
                          onSubmit={handleSubmit}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <motion.div 
                            className="form-fields-holder"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <div className="text-field-wrapper">
                              <div className="info">First Name</div>
                              <motion.input 
                                className="text-field w-input"
                                name="firstName"
                                placeholder="Your First Name"
                                required
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                whileFocus={{ 
                                  scale: 1.02,
                                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                                }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                            <div className="text-field-wrapper">
                              <div className="info">Last Name</div>
                              <motion.input 
                                className="text-field w-input"
                                name="lastName"
                                placeholder="Your Last Name"
                                required
                                type="text"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                whileFocus={{ 
                                  scale: 1.02,
                                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                                }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>

                          <motion.div 
                            className="form-fields-holder"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            <div className="text-field-wrapper">
                              <div className="info">Email</div>
                              <motion.input 
                                className="text-field w-input"
                                name="email"
                                placeholder="Your Email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                whileFocus={{ 
                                  scale: 1.02,
                                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                                }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>

                          <motion.div 
                            className="text-field-wrapper"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <div className="info">Message for the StudentVerse team</div>
                            <motion.textarea 
                              className="text-field message w-input"
                              name="message"
                              placeholder="Your Message"
                              required
                              value={formData.message}
                              onChange={handleInputChange}
                              whileFocus={{ 
                                scale: 1.02,
                                boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                              }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                          >
                            <label htmlFor="department">Who is this for?</label>
                            <motion.select 
                              id="department" 
                              name="department" 
                              required
                              value={formData.department}
                              onChange={handleInputChange}
                              whileFocus={{ 
                                scale: 1.02,
                                boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <option value="">Select an option</option>
                              <option value="support">Student Support</option>
                              <option value="merchant">Merchant / Business</option>
                            </motion.select>
                            <p className="form-hint">Choose the option that best matches your inquiry.</p>
                          </motion.div>

                          <motion.input 
                            className="button secondary w-button"
                            type="submit"
                            value="Submit"
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 8px 25px rgba(41, 98, 255, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                          />
                        </motion.form>
                      )}

                      {isSubmitted && (
                        <motion.div 
                          className="thank-you-message w-form-done"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div>
                            Thank you! <br />
                            <br />
                            Your submission has been received!
                          </div>
                        </motion.div>
                      )}

                      {isError && (
                        <motion.div 
                          className="error-message w-form-fail"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div>Oops! Something went wrong while submitting the form.</div>
                        </motion.div>
                      )}
                    </div>

                    <motion.div 
                      className="contact-more-info"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                    >
                      <motion.div 
                        className="contact-info"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="contact-info-text">careers@studentverse.app</div>
                      </motion.div>
                      <motion.div 
                        className="contact-info"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="contact-info-text">Dubai, United Arab Emirates</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Background Elements */}
          <img 
            alt="Background gradient" 
            className="hero-background-v3" 
            loading="lazy"
            src="https://wubflow-shield.NOCODEXPORT.DEV/66a92b76e1155b1f28fde0f0/66a93af172650e4b84a4159c_Dark%20Gradient%2003.webp" 
          />
          <div className="gradient-tpo"></div>
        </div>
      </div>
    </div>
  );
}