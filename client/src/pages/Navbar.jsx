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
          zIndex: 1000
        }}
        role="banner"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 h-20 sm:h-24 md:h-28 lg:h-32 max-w-full mx-0 relative w-full">
          {/* Logo Section */}
          <div className="relative z-10">
            <Link
              to="/"
              onClick={handleNavClick}
              className="block"
            >
              <img
                alt="StudentVerse Logo"
                loading="lazy"
                src="/assets/svlogo.png"
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto block"
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
                className="px-4 sm:px-8 md:px-12 lg:px-16"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(8, 12, 31, 0.95)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "50px",
                  padding: "0.75rem 2rem",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  border: "2px solid transparent",
                  minWidth: "400px",
                  maxWidth: "600px",
                  pointerEvents: "auto",
                  zIndex: 10
                }}
              >
                <div 
                  className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center justify-center w-full"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={handleNavClick}
                      className="text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 relative py-2 whitespace-nowrap tracking-wide"
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
                fontSize: "1.2rem",
                fontWeight: "700",
                textTransform: "uppercase",
                padding: "1rem 2.5rem",
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
              zIndex: 1001,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "0.5rem"
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
                  <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                          onClick={handleNavClick}
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
                    to={isAuthenticated ? "/waitlist" : "/waitlist"}
                    onClick={handleNavClick}
                    className="join-waitlist-button"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "50px",
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.5px"
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ display: "block" }}
                    >
                      {isAuthenticated ? "View Dashboard" : "Join The Waitlist"}
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
