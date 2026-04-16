import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const InstagramBtn = styled.a`
  background: transparent;
  position: relative;
  padding: 5px 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #e4405f;
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  color: #e4405f;
  transition: color 0.3s 0.1s ease-out;

  span { margin: 4px; }

  &::before {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    border-color: #e4405f;
  }

  &:hover::before {
    box-shadow: inset 0 0 0 10em #e4405f;
  }
`;

const LinkedInBtn = styled.a`
  background: transparent;
  position: relative;
  padding: 5px 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #0A66C2;
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  color: #0A66C2;
  transition: color 0.3s 0.1s ease-out;

  span { margin: 4px; }

  &::before {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    margin: auto;
    content: '';
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    text-align: center;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  &:hover {
    color: #fff;
    border-color: #0A66C2;
  }

  &:hover::before {
    box-shadow: inset 0 0 0 10em #0A66C2;
  }
`;

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    social: [
      { name: 'Instagram', href: 'https://www.instagram.com/studentverse.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
      { name: 'Linkedin', href: 'https://www.linkedin.com/company/studentverseofficial/posts/?feedView=all' }
    ],
    support: [
      { name: 'Help', href: '/support', hoverColor: '#007AFF' },
      { name: 'FAQs', href: '/about#faq-about', hoverColor: '#ff9800' },
      { name: 'Connect with Us', href: '/contact', hoverColor: '#7b2cbf' }
    ],
    legal: [
      { name: 'Terms & Conditions', href: '/terms', hoverColor: '#007AFF' },
      { name: 'Privacy Policy', href: '/privacy', hoverColor: '#ff9800' },
      { name: 'Cookie Policy', href: '/cookies', hoverColor: '#7b2cbf' }
    ]
  };

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="footer-glow footer-glow-1" />
      <div className="footer-glow footer-glow-2" />
      
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Section */}
          <div className="footer-brand-section">
            <Link className="footer-brand" to="/">
              <img
                alt="StudentVerse Logo"
                className="footer-logo"
                loading="lazy"
                src="/assets/svlogo.png"
              />
            </Link>
            <p className="footer-tagline">
              Simplify your student life with StudentVerse.
            </p>
            <div className="footer-social">
              <InstagramBtn
                href="https://www.instagram.com/studentverse.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
                <span>Instagram</span>
              </InstagramBtn>

              <LinkedInBtn
                href="https://www.linkedin.com/company/studentverseofficial/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </LinkedInBtn>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link"
                      onClick={(e) => {
                        const path = link.href.split('#')[0];
                        if (window.location.pathname === path) {
                          if (link.href.includes('#')) {
                            const hash = link.href.split('#')[1];
                            const el = document.getElementById(hash);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = link.hoverColor; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link"
                      onMouseEnter={e => { e.currentTarget.style.color = link.hoverColor; e.currentTarget.style.transform = 'translateX(5px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="copyright">
            &copy; {new Date().getFullYear()} StudentVerse. All rights reserved.
          </p>
        </motion.div>
      </div>

      <style>{`
        .footer-section {
          position: relative;
          padding: 80px 20px 40px;
          overflow: hidden;
          margin: 0;
          margin-top: -1px;
        }

        .footer-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
        }

        .footer-glow-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #2962ff 0%, transparent 70%);
          top: 0;
          left: -100px;
        }

        .footer-glow-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #7b2cbf 0%, transparent 70%);
          bottom: 0;
          right: -100px;
        }

        .container {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          padding-left: clamp(20px, 5vw, 80px);
          padding-right: clamp(20px, 5vw, 80px);
          position: relative;
          z-index: 1;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-brand-section {
          flex: 1;
          max-width: 360px;
        }

        .footer-brand {
          display: inline-block;
          margin-bottom: 16px;
        }

        .footer-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 20px;
        }

        .footer-social {
          display: flex;
          gap: 16px;
        }

        .social-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: #ffffff;
          border-color: rgba(41, 98, 255, 0.5);
          background: rgba(41, 98, 255, 0.1);
        }

        .footer-links-grid {
          display: flex;
          gap: 80px;
        }

        .footer-column {
          min-width: 150px;
        }

        .footer-heading {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #007AFF;
          transform: translateX(5px);
        }

        .footer-bottom {
          padding-top: 30px;
          text-align: center;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer-section {
            padding: 60px 16px 30px;
          }

          .footer-content {
            flex-direction: column !important;
            gap: 40px !important;
            align-items: center !important;
            text-align: center !important;
            display: flex !important;
            grid-template-columns: none !important;
          }

          .footer-brand-section {
            max-width: 100% !important;
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }

          .footer-brand {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            margin: 0 auto !important;
            text-align: center !important;
          }

          .footer-brand img {
            margin: 0 auto !important;
            padding-left: 50px !important;
          }

          .footer-social {
            justify-content: center !important;
          }

          .footer-links-grid {
            justify-content: center !important;
            gap: 40px !important;
            flex-wrap: wrap !important;
            width: 100% !important;
          }

          .footer-column {
            text-align: center !important;
            min-width: 120px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }

          .footer-links {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .footer-links li {
            text-align: center !important;
            margin-bottom: 4px !important;
            list-style: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
