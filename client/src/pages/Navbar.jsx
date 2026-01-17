import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or on links
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  const isActiveLink = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  return (
    <>
      <motion.div
        className={`navbar w-nav navbar-glass-effect ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="banner"
      >
        <div className="container navbar-container" style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "0 2rem",
          height: "70px",
          maxWidth: "100%",
          margin: 0
        }}>
          {/* Logo Section */}
          <motion.div 
            className="hiw-icon"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="brand w-nav-brand" to="/">
              <img
                alt="StudentVerse Logo"
                className="brand-image"
                loading="lazy"
                src="/assets/svlogo.png"
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="nav-menu w-nav-menu show-desktop hidden-mobile" role="navigation">
            <div className="nav-links nav-links-pill" style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center"
            }}>
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  className="nav-link w-nav-link nav-link-glow"
                  to={link.href}
                  style={{
                    color: isActiveLink(link.href) ? "#ffffff" : "#ffffff",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: isActiveLink(link.href) ? "600" : "500",
                    transition: "color 0.2s ease",
                    position: "relative",
                    padding: "0.5rem 0"
                  }}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "#ffffff",
                        borderRadius: "1px"
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="navbar-right-actions show-desktop hidden-mobile" style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <Link
              className="nav-signin-button"
              to="/waitlist"
              style={{
                background: "transparent",
                color: "#fff",
                fontWeight: "600",
                fontSize: "0.9rem",
                padding: "0.6rem 1.2rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-block"
              }}
            >
              <motion.span
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#fff",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{ display: "block" }}
              >
                Sign in
              </motion.span>
            </Link>
            <Link
              className="nav-cta-button cta-glow"
              to="/waitlist"
              style={{
                background: "linear-gradient(90deg, #2962FF, #7B2CBF, #FFB800)",
                backgroundSize: "200% 200%",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-block"
              }}
            >
              <motion.span
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                style={{ display: "block" }}
              >
                JOIN THE WAITLIST
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="menu-button hamburger-btn hidden-desktop show-mobile"
            onClick={toggleMenu}
            style={{
              zIndex: 1001
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />
            
            {/* Drawer */}
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header */}
                <div className="mobile-drawer-header">
                  <img
                    src="/assets/svlogo.png"
                    alt="StudentVerse"
                    style={{ height: "32px" }}
                  />
                  <button
                    onClick={closeMenu}
                    className="close-btn"
                    aria-label="Close menu"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav style={{ flex: 1, padding: "2rem 1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {navLinks.map((link, index) => (
                      <motion.div key={link.href}>
                        <Link
                          to={link.href}
                          onClick={closeMenu}
                          className="mobile-nav-link"
                          style={{
                            color: isActiveLink(link.href) ? "#ffffff" : "#ffffff",
                            fontWeight: isActiveLink(link.href) ? "600" : "500"
                            
                          }}
                        >
                          <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            whileHover={{ x: 10 }}
                            style={{ display: "block" }}
                          >
                            {link.label}
                          </motion.span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Bottom Actions */}
                <div style={{ 
                  padding: "1.5rem", 
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}>
                  <Link
                    to="/waitlist"
                    onClick={closeMenu}
                    className="mobile-cta-secondary"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ display: "block" }}
                    >
                      Sign in
                    </motion.span>
                  </Link>
                  <Link
                    to="/waitlist"
                    onClick={closeMenu}
                    className="mobile-cta-primary cta-glow"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ display: "block" }}
                    >
                      JOIN THE WAITLIST
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
