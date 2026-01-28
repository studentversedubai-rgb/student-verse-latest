import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="section" >
      <div className="container" >
        <div
          ref={footerRef}
          className="footer-wrapper"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
            }}
          >
            <Link className="footer-brand w-inline-block" to="/">
              <img
                alt="StudentVerse Logo"
                className="footer-brand-image"
                loading="lazy"
                src="/assets/svlogo.png"
              />
              <div className="footer-heading">
                Simplify your student life with StudentVerse.
              </div>
              <div className="footer-paragraph-holder"></div>
            </Link>
          </div>

          <div
            className="footer-content"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 0.7s ease-out 0.4s, transform 0.7s ease-out 0.4s'
            }}
          >
            <div
              className="footer-block"
              id="w-node-e92bf484-a605-4132-f141-4518468af7ef-468af7d9"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
              }}
            >
              <div className="title-small">Social media</div>
              <a
                className="footer-link"
                href="https://www.instagram.com/studentverse.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                className="footer-link"
                href="https://www.linkedin.com/company/studentverseofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </div>

            <div
              className="footer-block"
              id="w-node-e92bf484-a605-4132-f141-4518468af7fa-468af7d9"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
              }}
            >
              <div className="title-small">Student &amp; Support</div>
              <a
                className="footer-link"
                href="/about#faq-about"
              >
                FAQs
              </a>
              <Link
                className="footer-link"
                to="/contact"
              >
                Connect with US
              </Link>
            </div>
            <div
              className="footer-block"
              id="w-node-e92bf484-a605-4132-f141-4518468af7fa-468af7d9"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
              }}
            >
              <div className="title-small">Terms &amp; Conditions</div> 
              <Link
                className="footer-link"
                to="/terms"
              >
                Privacy Policy
              </Link>
              
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}