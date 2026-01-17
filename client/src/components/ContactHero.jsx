import { useState } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl_v2 } from '../config/api';

export default function ContactHero() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    department: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Map department values to match backend expectations
      const inquiryTypeMap = {
        'support': 'student_support',
        'merchant': 'merchant_business',
        'careers': 'student_support',
        'partnerships': 'merchant_business'
      };

      const response = await fetch(getApiUrl_v2('/api/contact/submit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          inquiryType: inquiryTypeMap[formData.department] || 'student_support'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      // Success - show success screen
      setIsSubmitted(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        department: ''
      });
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (isSubmitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #0a0e1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(41, 98, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255, 184, 0, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(8, 12, 31, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(rgba(8, 12, 31, 0.9), rgba(8, 12, 31, 0.9)), linear-gradient(45deg, #2962FF, #FFB800, #7B2CBF)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            maxWidth: '500px',
            position: 'relative',
            zIndex: 10
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #2962FF, #00F0FF)',
              borderRadius: '50%',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.5)'
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              background: 'linear-gradient(315deg, #999, #fff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}
          >
            Message Sent!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
          >
            Thank you for reaching out! We've received your message and will get back to you within 24 hours.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            style={{
              background: 'linear-gradient(90deg, #2962FF, #7B2CBF, #FFB800)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(41, 98, 255, 0.4)'
            }}
          >
            Send Another Message
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'black',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '2rem',
      paddingBottom: '4rem'
    }}>
      {/* Animated Background Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(41, 98, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
        variants={floatingVariants}
        animate="animate"
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 184, 0, 0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)'
        }}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '20%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(123, 44, 191, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}
        >
          <motion.h1
            variants={itemVariants}
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
            Let's Connect
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
          >
            Have a question, idea, or want to partner with us? The StudentVerse team is ready to help you succeed.
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Contact Info Cards */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(8, 12, 31, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #2962FF, #00F0FF)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                Email Us
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                Get in touch with our team for support, partnerships, or career opportunities.
              </p>
              <a
                href="mailto:careers@studentverse.app"
                style={{
                  color: '#00F0FF',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1.1rem'
                }}
              >
                careers@studentverse.app
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(8, 12, 31, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #FFB800, #FF6B00)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 0 20px rgba(255, 184, 0, 0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="white" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                Visit Us
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                Located in the heart of innovation and technology.
              </p>
              <p style={{
                color: '#FFB800',
                fontWeight: '500',
                fontSize: '1.1rem'
              }}>
                Dubai, United Arab Emirates
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              background: 'rgba(8, 12, 31, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(8, 12, 31, 0.9), rgba(8, 12, 31, 0.9)), linear-gradient(45deg, #2962FF, #FFB800, #7B2CBF)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: '600',
                color: 'white',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                textAlign: 'center'
              }}
            >
              Send us a message
            </motion.h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    First Name
                  </label>
                  <motion.input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                    }}
                    style={{
                      width: '100%',
                      padding: 'clamp(0.75rem, 2vw, 1rem)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Your first name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    Last Name
                  </label>
                  <motion.input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                    }}
                    style={{
                      width: '100%',
                      padding: 'clamp(0.75rem, 2vw, 1rem)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Your last name"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Email Address
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                  }}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Department
                </label>
                <motion.select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                  }}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <option value="" style={{ background: '#1a1f2e', color: 'white' }}>Select a department</option>
                  <option value="support" style={{ background: '#1a1f2e', color: 'white' }}>Student Support</option>
                  <option value="merchant" style={{ background: '#1a1f2e', color: 'white' }}>Merchant / Business</option>
                  <option value="careers" style={{ background: '#1a1f2e', color: 'white' }}>Careers</option>
                  <option value="partnerships" style={{ background: '#1a1f2e', color: 'white' }}>Partnerships</option>
                </motion.select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)"
                  }}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    resize: 'vertical',
                    minHeight: 'clamp(100px, 15vw, 120px)',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Tell us about your inquiry, idea, or how we can help you..."
                />
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255, 59, 48, 0.1)',
                    border: '1px solid rgba(255, 59, 48, 0.3)',
                    borderRadius: '12px',
                    color: '#ff3b30',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                style={{
                  background: isSubmitting
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(90deg, #2962FF, #7B2CBF, #FFB800)',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(0.875rem, 2.5vw, 1.2rem) clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '50px',
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: isSubmitting
                    ? 'none'
                    : '0 4px 20px rgba(41, 98, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%'
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}