import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InstagramButton from "../components/InstagramButton";
import LinkedInButton from "../components/LinkedInButton";

// Add swipe animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes swipeAcross {
    0% { left: -30%; opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { left: 130%; opacity: 0; }
  }
`;
document.head.appendChild(style);

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
    { href: "/", label: "Home", color: "#2962ff", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { href: "/about", label: "About", color: "#ff9800", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { href: "/contact", label: "Contact", color: "#9c27b0", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
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
          background: 'rgba(8, 12, 31, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: "all 0.3s ease",
          overflow: 'visible'
        }}
        role="banner"
      >
        {/* Dense stars background for entire navbar - matching website theme */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(1px 1px at 3% 10%, rgba(255,255,255,0.7), transparent), radial-gradient(1.2px 1.2px at 8% 25%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 13% 40%, rgba(255,255,255,0.6), transparent), radial-gradient(1.3px 1.3px at 18% 55%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 23% 70%, rgba(255,255,255,0.7), transparent), radial-gradient(1.2px 1.2px at 28% 85%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 33% 15%, rgba(255,255,255,0.6), transparent), radial-gradient(1.4px 1.4px at 38% 30%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 43% 45%, rgba(255,255,255,0.7), transparent), radial-gradient(1.3px 1.3px at 48% 60%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 53% 75%, rgba(255,255,255,0.6), transparent), radial-gradient(1.2px 1.2px at 58% 90%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 63% 20%, rgba(255,255,255,0.7), transparent), radial-gradient(1.4px 1.4px at 68% 35%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 73% 50%, rgba(255,255,255,0.6), transparent), radial-gradient(1.3px 1.3px at 78% 65%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 83% 80%, rgba(255,255,255,0.7), transparent), radial-gradient(1.2px 1.2px at 88% 95%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 93% 5%, rgba(255,255,255,0.6), transparent), radial-gradient(1.4px 1.4px at 98% 22%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 5% 48%, rgba(255,255,255,0.65), transparent), radial-gradient(1.2px 1.2px at 10% 63%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 15% 78%, rgba(255,255,255,0.55), transparent), radial-gradient(1.3px 1.3px at 20% 93%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 25% 8%, rgba(255,255,255,0.65), transparent), radial-gradient(1.4px 1.4px at 30% 23%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 35% 38%, rgba(255,255,255,0.55), transparent), radial-gradient(1.2px 1.2px at 40% 53%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 45% 68%, rgba(255,255,255,0.65), transparent), radial-gradient(1.3px 1.3px at 50% 83%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 55% 98%, rgba(255,255,255,0.55), transparent), radial-gradient(1.4px 1.4px at 60% 13%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 65% 28%, rgba(255,255,255,0.65), transparent), radial-gradient(1.2px 1.2px at 70% 43%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 75% 58%, rgba(255,255,255,0.55), transparent), radial-gradient(1.3px 1.3px at 80% 73%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 85% 88%, rgba(255,255,255,0.65), transparent), radial-gradient(1.4px 1.4px at 90% 3%, rgba(255,255,255,0.45), transparent), radial-gradient(1px 1px at 95% 18%, rgba(255,255,255,0.55), transparent), radial-gradient(1.2px 1.2px at 100% 33%, rgba(255,255,255,0.35), transparent)`,
            backgroundSize: '100% 100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
          }}
        />
        {/* Swipe effect for entire navbar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '-20%',
              width: '15%',
              height: '2px',
              transform: 'translateY(-50%)',
              background: location.pathname === '/about' 
                ? 'linear-gradient(90deg, transparent, #ff9800, transparent)' 
                : location.pathname === '/contact'
                ? 'linear-gradient(90deg, transparent, #9c27b0, transparent)'
                : 'linear-gradient(90deg, transparent, #2962ff, transparent)',
              animation: 'swipeAcross 3s ease-in-out infinite',
              borderRadius: '2px',
              boxShadow: location.pathname === '/about'
                ? '0 0 15px #ff9800'
                : location.pathname === '/contact'
                ? '0 0 15px #9c27b0'
                : '0 0 15px #2962ff',
              opacity: 0.7
            }}
          />
        </div>
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 h-16 sm:h-18 md:h-20 lg:h-22 max-w-full mx-0 relative w-full" style={{ position: 'relative', zIndex: 2 }}>
          {/* Mobile: Spacer for right side */}
          <div className="block sm:hidden" style={{ width: '40px' }}></div>

          {/* Logo Section */}
          <div className="relative z-50 flex justify-center sm:justify-start flex-1 sm:flex-initial">
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

          {/* Desktop Navigation - Pill Design */}
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
              <nav
                role="navigation"
                className="px-3 sm:px-6 md:px-8 lg:px-10"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#000000",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: "50px",
                  padding: "0.5rem 1.5rem",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  minWidth: "300px",
                  maxWidth: "450px",
                  pointerEvents: "auto",
                  zIndex: 10,
                  overflow: "hidden"
                }}
              >
                {/* Stars background */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 50% 30%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 70% 70%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 20% 80%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 40% 10%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.3), transparent)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '100% 100%',
                    opacity: 0.6,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
                {/* Swipe effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    className="swipe-dash"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-100%',
                      width: '30%',
                      height: '2px',
                      transform: 'translateY(-50%)',
                      background: location.pathname === '/about' 
                        ? 'linear-gradient(90deg, transparent, #ff9800, transparent)' 
                        : location.pathname === '/contact'
                        ? 'linear-gradient(90deg, transparent, #9c27b0, transparent)'
                        : 'linear-gradient(90deg, transparent, #2962ff, transparent)',
                      animation: 'swipeAcross 3s ease-in-out infinite',
                      borderRadius: '2px',
                      boxShadow: location.pathname === '/about'
                        ? '0 0 10px #ff9800'
                        : location.pathname === '/contact'
                        ? '0 0 10px #9c27b0'
                        : '0 0 10px #2962ff',
                      opacity: 0.8
                    }}
                  />
                </div>
                <div
                  className="flex gap-3 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center w-full"
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={handleNavClick}
                      className="text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 relative py-1.5 whitespace-nowrap tracking-wide"
                      style={{
                        color: isActiveLink(link.href) ? link.color : "rgba(255, 255, 255, 0.8)",
                        textDecoration: "none",
                        fontWeight: isActiveLink(link.href) ? "700" : "600",
                        textShadow: isActiveLink(link.href) ? `0 0 20px ${link.color}80` : "none",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
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
                      <span style={{ display: 'flex', alignItems: 'center', color: isActiveLink(link.href) ? link.color : 'inherit' }}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="show-desktop hidden-mobile flex items-center relative z-50">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* Instagram */}
              <InstagramButton />

              {/* LinkedIn */}
              <LinkedInButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="hidden-desktop show-mobile"
            onClick={toggleMenu}
            style={{
              zIndex: 1003,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(41, 98, 255, 0.3)",
              cursor: "pointer",
              padding: "0.6rem",
              borderRadius: "0.5rem",
              position: "relative",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              style={{
                background: 'radial-gradient(ellipse at 20% 20%, rgba(41, 98, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(123, 44, 191, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255, 184, 0, 0.08) 0%, transparent 50%), #0a0a0f',
                boxShadow: '-20px 0 60px rgba(41, 98, 255, 0.2), -10px 0 30px rgba(123, 44, 191, 0.15)'
              }}
            >
              {/* Star particles overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent), radial-gradient(1.5px 1.5px at 160px 120px, rgba(255,255,255,0.4), transparent)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '200px 200px',
                  opacity: 0.6,
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />
              {/* Static gradient border on left edge */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background: "linear-gradient(180deg, #2962ff 0%, #ffb800 50%, #7b2cbf 100%)",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  zIndex: 2
                }}
              />

              {/* Header with Logo and Close Button */}
              <div
                className="mobile-drawer-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 2rem",
                  borderBottom: "1px solid rgba(41, 98, 255, 0.2)",
                  background: "linear-gradient(180deg, rgba(41, 98, 255, 0.1) 0%, transparent 100%)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  position: "relative",
                  zIndex: 2,
                  flexShrink: 0,
                  minHeight: "80px"
                }}
              >
                <img
                  src="/assets/svlogo.png"
                  alt="StudentVerse"
                  style={{ height: "36px" }}
                />
                <button
                  onClick={closeMenu}
                  className="close-btn"
                  aria-label="Close menu"
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav
                style={{
                  flex: 1,
                  padding: "2rem 2rem",
                  overflow: "auto",
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(1px 1px at 80px 50px, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 120px 150px, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 60px 200px, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 150px 80px, rgba(255,255,255,0.2), transparent)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '200px 200px',
                    opacity: 0.5,
                    pointerEvents: 'none'
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link
                        to={link.href}
                        onClick={handleNavClick}
                        className="mobile-nav-link"
                        style={{
                          display: "block",
                          padding: "1rem 1.5rem",
                          color: isActiveLink(link.href) ? link.color : "#ffffff",
                          textDecoration: "none",
                          fontSize: "1.1rem",
                          fontWeight: isActiveLink(link.href) ? "600" : "500",
                          borderRadius: "12px",
                          margin: "0.25rem 0",
                          transition: "all 0.3s ease",
                          background: isActiveLink(link.href)
                            ? `linear-gradient(90deg, ${link.color}26 0%, ${link.color}1a 100%)`
                            : "transparent",
                          border: isActiveLink(link.href)
                            ? `1px solid ${link.color}4d`
                            : "1px solid transparent",
                          position: "relative",
                          overflow: "hidden"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateX(8px)";
                          e.currentTarget.style.color = link.color;
                          e.currentTarget.style.background = `${link.color}1a`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.color = isActiveLink(link.href) ? link.color : "#ffffff";
                          e.currentTarget.style.background = isActiveLink(link.href)
                            ? `linear-gradient(90deg, ${link.color}26 0%, ${link.color}1a 100%)`
                            : "transparent";
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                            zIndex: 1
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', color: isActiveLink(link.href) ? link.color : 'inherit' }}>
                            {link.icon}
                          </span>
                          {link.label}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div
                style={{
                  padding: "1.5rem 2rem 2rem",
                  borderTop: "1px solid rgba(41, 98, 255, 0.2)",
                  background: "linear-gradient(180deg, transparent 0%, rgba(123, 44, 191, 0.1) 100%)",
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', alignItems: 'center' }}>
                  <a
                    href="https://www.instagram.com/studentverse.ae/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(225, 48, 108, 0.1)',
                      border: '1px solid rgba(225, 48, 108, 0.3)',
                      color: '#E1306C',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(225, 48, 108, 0.25)';
                      e.currentTarget.style.borderColor = 'rgba(225, 48, 108, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(225, 48, 108, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(225, 48, 108, 0.3)';
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="18" cy="6" r="1" fill="currentColor"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/studentverseofficial/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on LinkedIn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(10, 102, 194, 0.1)',
                      border: '1px solid rgba(10, 102, 194, 0.3)',
                      color: '#0A66C2',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(10, 102, 194, 0.25)';
                      e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(10, 102, 194, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.3)';
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
