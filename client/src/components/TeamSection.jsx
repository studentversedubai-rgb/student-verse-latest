import React, { useEffect, useRef, useState } from 'react';

const teamMembers = [
  { initials: "SG", name: "Sanjar Ghazanfar" },
  { initials: "MK", name: "Mohamed Elkhouly" },
  { initials: "SK", name: "Sara Carla Kader" },
  { initials: "HR", name: "Hunain Raza" },
  { initials: "IM", name: "Islam Al-Maamori" },
  { initials: "DS", name: "Daniyal Shagirov" },
  { initials: "MN", name: "Mariam Noor" },
  { initials: "AK", name: "Mohammed Ayaan Khan" },
  { initials: "MF", name: "Muhammad Finan" },
  { initials: "MM", name: "Muhammad Moiz" },
  { initials: "HW", name: "Hadi Wehbe" },
  { initials: "AS", name: "Angelina Daisy Shiju" },
  { initials: "SA", name: "Shahd Abdelfattah" },
  { initials: "NC", name: "Nikhil Chhahunja" },
  { initials: "DB", name: "Debjani Bagchi" },
  { initials: "DW", name: "Dwayne" },
  { initials: "SS", name: "Sanmeet Singh Khoil" },
  { initials: "KU", name: "Kunsh" },
];

function TeamCard({ member, index, isVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${0.05 * index}s, transform 0.5s ease ${0.05 * index}s`,
        background: 'rgba(255,255,255,0.03)',
        border: hovered
          ? '1px solid rgba(120, 130, 255, 0.35)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '28px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        cursor: 'default',
        boxShadow: hovered
          ? '0 0 0 1px rgba(120,130,255,0.12), 0 8px 32px rgba(0,0,0,0.35)'
          : '0 4px 20px rgba(0,0,0,0.25)',
        scale: hovered ? '1.04' : '1',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        willChange: 'transform',
        transitionProperty: 'opacity, transform, border-color, box-shadow, scale',
        transitionDuration: isVisible ? `0.5s, 0.5s, 0.2s, 0.2s, 0.2s` : '0.5s',
        transitionTimingFunction: 'ease',
        transitionDelay: isVisible ? `${0.05 * index}s, ${0.05 * index}s, 0s, 0s, 0s` : `${0.05 * index}s`,
      }}
    >
      {/* Avatar */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b4fd8 0%, #6366f1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: 'rgba(255,255,255,0.92)',
        letterSpacing: '0.03em',
        flexShrink: 0,
        boxShadow: '0 2px 12px rgba(99,102,241,0.25)',
      }}>
        {member.initials}
      </div>

      {/* Name */}
      <span style={{
        color: 'rgba(255,255,255,0.88)',
        fontSize: '0.9rem',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: '1.4',
        letterSpacing: '0.01em',
      }}>
        {member.name}
      </span>
    </div>
  );
}

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="org"
      ref={sectionRef}
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
          lineHeight: '1.1',
        }}>
          Meet the Team
        </h2>
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: '400',
          letterSpacing: '0.01em',
        }}>
          The people building StudentVerse
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 'clamp(1rem, 2.5vw, 1.5rem)',
      }}>
        {teamMembers.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
