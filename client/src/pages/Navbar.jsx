import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    // Scroll to top when any navigation link is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
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
      <div
        className={`navbar w-nav navbar-glass-effect ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        role="banner"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-18 md:h-20 lg:h-22 max-w-full mx-0 relative w-full">
          {/* Mobile: Hidden spacer for centering logo */}
          <div className="block sm:hidden w-10"></div>

          {/* Logo Section */}
          <div className="relative z-10 flex justify-center sm:justify-start flex-1 sm:flex-initial">
            <Link
              to="/"
              onClick={handleNavClick}
              className="block"
            >
              <img
                alt="StudentVerse Logo"
                loading="lazy"
                src="/assets/svlogo.png"
                className="ml-3 sm:ml-0 h-12 sm:h-8 md:h-9 lg:h-10 w-auto block"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Pill Design with Animated Border */}
          <div
            className="show-desktop hidden-mobile"
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5,
              pointerEvents: "none"
            }}
          >
            {/* Animated gradient border container */}
            <div className="relative">
              {/* Animated gradient border */}
              <div className="absolute -inset-[2px] rounded-full opacity-80">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #00b8cc 0%, #cc8800 35%, #9a1f5a 70%, #00b8cc 100%)",
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
                {/* Soft glow effect */}
                <div className="absolute inset-0 rounded-full blur-lg" style={{
                  background: "linear-gradient(90deg, rgba(0, 184, 204, 0.4) 0%, rgba(204, 136, 0, 0.4) 35%, rgba(154, 31, 90, 0.4) 70%, rgba(0, 184, 204, 0.4) 100%)"
                }} />
              </div>

              <nav
                role="navigation"
                className="px-3 sm:px-6 md:px-8 lg:px-10"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(8, 12, 31, 0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "50px",
                  padding: "0.5rem 1.5rem",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  border: "2px solid transparent",
                  minWidth: "300px",
                  maxWidth: "450px",
                  pointerEvents: "auto",
                  zIndex: 10
                }}
              >
                <div
                  className="flex gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center w-full"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={handleNavClick}
                      className="text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 relative py-1.5 whitespace-nowrap tracking-wide"
                      style={{
                        color: isActiveLink(link.href) ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                        textDecoration: "none",
                        fontWeight: isActiveLink(link.href) ? "700" : "600",
                        textShadow: isActiveLink(link.href) ? "0 0 20px rgba(255, 255, 255, 0.5)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActiveLink(link.href)) {
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.textShadow = "0 0 15px rgba(255, 255, 255, 0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveLink(link.href)) {
                          e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                          e.currentTarget.style.textShadow = "none";
                        }
                      }}
                    >
                      {link.label}
                      {isActiveLink(link.href) && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #00b8cc, #cc8800)",
                            boxShadow: "0 0 10px #00b8cc"
                          }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="show-desktop hidden-mobile flex items-center relative z-10">
            <Link
              to={isAuthenticated ? "/waitlist" : "/waitlist"}
              onClick={handleNavClick}
              className="join-waitlist-button"
              style={{
                fontSize: "0.85rem",
                fontWeight: "700",
                textTransform: "uppercase",
                padding: "0.65rem 1.5rem",
                borderRadius: "50px",
                textDecoration: "none",
                display: "inline-block",
                whiteSpace: "nowrap",
                letterSpacing: "0.5px"
              }}
            >
              {isAuthenticated ? "View Dashboard" : "Join The Waitlist"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="hidden-desktop show-mobile"
            onClick={toggleMenu}
            style={{
              zIndex: 1003,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              position: "relative"
            }}
            aria-label="Toggle mobile menu"
          >
            <div
              style={{
                transition: "transform 0.3s ease"
              }}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>

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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
            >
              {/* Animated gradient border on left edge */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background: "linear-gradient(180deg, #00b8cc 0%, #cc8800 50%, #9a1f5a 100%)",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  zIndex: 2
                }}
              />

              {/* Header with Logo and Close Button */}
              <motion.div
                className="mobile-drawer-header"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 2rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  position: "relative",
                  zIndex: 2,
                  flexShrink: 0,
                  minHeight: "80px"
                }}
              >
                <motion.img
                  src="/assets/svlogo.png"
                  alt="StudentVerse"
                  style={{ height: "36px" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  onClick={closeMenu}
                  className="close-btn"
                  aria-label="Close menu"
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#ffffff",
                    transition: "all 0.2s ease"
                  }}
                >
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </motion.button>
              </motion.div>

              {/* Navigation Links */}
              <motion.nav
                style={{
                  flex: 1,
                  padding: "2rem 2rem",
                  overflow: "auto",
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: 50, opacity: 0, scale: 0.9 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.4 + (index * 0.1),
                        duration: 0.6,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <Link
                        to={link.href}
                        onClick={handleNavClick}
                        className="mobile-nav-link"
                        style={{
                          display: "block",
                          padding: "1rem 1.5rem",
                          color: isActiveLink(link.href) ? "#00b8cc" : "#ffffff",
                          textDecoration: "none",
                          fontSize: "1.1rem",
                          fontWeight: isActiveLink(link.href) ? "600" : "500",
                          borderRadius: "12px",
                          margin: "0.25rem 0",
                          transition: "all 0.3s ease",
                          background: isActiveLink(link.href)
                            ? "linear-gradient(90deg, rgba(0, 184, 204, 0.15) 0%, rgba(204, 136, 0, 0.1) 100%)"
                            : "transparent",
                          border: isActiveLink(link.href)
                            ? "1px solid rgba(0, 184, 204, 0.3)"
                            : "1px solid transparent",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <motion.span
                          whileHover={{
                            x: 8,
                            scale: 1.02,
                            color: "#00F0FF"
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            display: "block",
                            position: "relative",
                            zIndex: 1
                          }}
                        >
                          {link.label}
                        </motion.span>

                        {/* Hover effect background */}
                        <motion.div
                          className="hover-bg"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(0, 240, 255, 0.1)",
                            borderRadius: "12px",
                            zIndex: 0
                          }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>

              {/* Bottom CTA */}
              <motion.div
                style={{
                  padding: "1.5rem 2rem 2rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "linear-gradient(90deg, rgba(0, 184, 204, 0.05) 0%, rgba(204, 136, 0, 0.03) 50%, rgba(154, 31, 90, 0.05) 100%)",
                  flexShrink: 0
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  to="/waitlist"
                  onClick={handleNavClick}
                  className="join-waitlist-button"
                  style={{

                    fontSize: "1rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    padding: "0.8rem 2rem",
                    borderRadius: "50px",
                    textDecoration: "none",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.5px"
                  }}
                >
                  {isAuthenticated ? "View Dashboard" : "Join The UNI-verse"}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
