import React, { useEffect, useRef, useState } from 'react';

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
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = {
    boss: {
      initials: "SG",
      name: "Sanjar Ghazanfar",
      role: "Founder",
      color: "linear-gradient(135deg, #7B2CBF, #9D4EDD)"
    },
    leads: [
      {
        id: "cto",
        initials: "MK",
        name: "Mohamed Elkhouly",
        role: "Product Manager  ",
        color: "linear-gradient(135deg, #2962FF, #3B82F6)"
      },
      {
        id: "marketing",
        initials: "SK",
        name: "Sara Carla Kader",
        role: "Head of Marketing",
        color: "linear-gradient(135deg, #00F0FF, #06B6D4)"
      },
      {
        id: "merchant",
        initials: "HR",
        name: "Hunain Raza",
        role: "Merchant Acquisition Lead",
        color: "linear-gradient(135deg, #FFB800, #F59E0B)"
      }
    ],
    technology: [
      {
        id: "frontend-lead",
        initials: "IM",
        name: "Islam Al-Maamori",
        role: "Frontend Leader",
        color: "linear-gradient(135deg, #2962FF, #3B82F6)"
      },
      {
        id: "backend-lead",
        initials: "DS",
        name: "Daniyal Shagirov",
        role: "Backend Leader",
        color: "linear-gradient(135deg, #7B2CBF, #9D4EDD)"
      },
      {
        id: "tech-be-1",
        initials: "MN",
        name: "Mariam Noor",
        role: "Frontend Dev",
        color: "linear-gradient(135deg, #00F0FF, #06B6D4)"
      },
      {
        id: "tech-fe-3",
        initials: "AK",
        name: "Mohammed Ayaan Khan",
        role: "Frontend Dev",
        color: "linear-gradient(135deg, #FFB800, #F59E0B)"
      },
      {
        id: "tech-be-2",
        initials: "MF",
        name: "Muhammad Finan",
        role: "Backend Dev",
        color: "linear-gradient(135deg, #2962FF, #3B82F6)"
      },
      {
        id: "tech-fe-1",
        initials: "MM",
        name: "Muhammad Moiz",
        role: "Frontend Dev",
        color: "linear-gradient(135deg, #7B2CBF, #9D4EDD)"
      },

      {
        id: "tech-fe-3-2",
        initials: "HW",
        name: "Hadi Wehbe",
        role: "Frontend Dev",
        color: "linear-gradient(135deg, #FFB800, #F59E0B)"
      }
    ],
    marketing: [
      {
        id: "mkt-1",
        initials: "AS",
        name: "Angelina Daisy Shiju",
        role: "Marketing",
        color: "linear-gradient(135deg, #00F0FF, #06B6D4)"
      },
      {
        id: "mkt-3",
        initials: "SA",
        name: "Shahd Abdelfattah",
        role: "Marketing",
        color: "linear-gradient(135deg, #FFB800, #F59E0B)"
      }
    ],
    merchants: [
      {
        id: "merch-1",
        initials: "NC",
        name: "Nikhil Chhahunja",
        role: "Merchant",
        color: "linear-gradient(135deg, #2962FF, #3B82F6)"
      },
      {
        id: "merch-2",
        initials: "DB",
        name: "Debjani Bagchi",
        role: "Merchant",
        color: "linear-gradient(135deg, #7B2CBF, #9D4EDD)"
      }
    ]
  };

  const TeamCard = ({ member, isFounder = false, isLead = false }) => {
    const getColorValues = (colorGradient) => {
      if (colorGradient.includes('#2962FF')) return { primary: '#2962FF', secondary: '#00F0FF' };
      if (colorGradient.includes('#00F0FF')) return { primary: '#00F0FF', secondary: '#2962FF' };
      if (colorGradient.includes('#7B2CBF')) return { primary: '#7B2CBF', secondary: '#FF9100' };
      return { primary: '#FFB800', secondary: '#FF9100' };
    };

    const colors = getColorValues(member.color);

    return (
      <div className="relative rounded-3xl overflow-visible" style={{ maxWidth: isFounder ? "320px" : isLead ? "280px" : "260px", margin: "0 auto" }}>
        {/* Card content */}
        <div
          className="relative"
          style={{
            background: "linear-gradient(145deg, rgba(20, 25, 45, 0.95) 0%, rgba(15, 18, 35, 0.9) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2px solid transparent",
            borderRadius: isFounder ? "24px" : "18px",
            padding: isFounder ? "clamp(1.5rem, 4vw, 2rem) clamp(2rem, 5vw, 2.5rem)" : isLead ? "clamp(1rem, 3vw, 1.5rem)" : "clamp(0.875rem, 2.5vw, 1.25rem)",
            display: "flex",
            flexDirection: isFounder ? "column" : "row",
            alignItems: "center",
            gap: isFounder ? "1.25rem" : "1rem",
            position: "relative",
            width: "100%",
            minHeight: isFounder ? "140px" : isLead ? "100px" : "85px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
          }}
        >
          {/* Subtle glow effect */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)`,
            opacity: 0.6
          }} />

          <div
            style={{
              background: member.color,
              color: "#ffffff",
              width: isFounder ? "65px" : isLead ? "50px" : "45px",
              height: isFounder ? "65px" : isLead ? "50px" : "45px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isFounder ? "1.6rem" : isLead ? "1.25rem" : "1.1rem",
              fontWeight: "700",
              flexShrink: 0,
              boxShadow: `0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px ${colors.primary}30`,
              border: "2px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            {member.initials}
          </div>

          <div style={{
            textAlign: isFounder ? "center" : "left",
            flex: 1,
            minWidth: 0
          }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: isFounder ? "1.25rem" : isLead ? "1.1rem" : "1rem",
                fontWeight: "600",
                marginBottom: "0.3rem",
                lineHeight: "1.3",
                wordBreak: "break-word"
              }}
            >
              {member.name}
            </div>
            <div
              style={{
                fontSize: isFounder ? "0.95rem" : isLead ? "0.9rem" : "0.85rem",
                fontWeight: "500",
                lineHeight: "1.4",
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {member.role}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "0" }}>
      <div>
        <div
          ref={sectionRef}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <section id="org" style={{ padding: "0" }}>
            <div style={{ width: "min(1100px, 92vw)", margin: "0 auto" }}>
              <header
                style={{
                  textAlign: "center",
                  marginBottom: "clamp(2rem, 5vw, 3rem)",
                  marginTop: "0",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: '700',
                    background: 'linear-gradient(315deg, #999, #fff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
                  }}
                >
                  Meet The Team
                </h1>
                <p
                  style={{
                    fontSize: "1.3rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    maxWidth: "600px",
                    margin: "0 auto",
                    lineHeight: "1.6",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
                  }}
                >
                  A quick look at how we're structured.
                </p>
              </header>

              <div className="relative" style={{ 
                overflow: "visible",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s'
              }}>
                {/* Animated RGB border */}
                <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                  <div
                    className="absolute inset-0"
                    style={{
                      borderRadius: "clamp(20px, 4vw, 32px)",
                      background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
                      backgroundSize: "300% 300%",
                      animation: "rgbBorder 4s linear infinite"
                    }}
                  />
                  {/* Soft multi-color glow effect */}
                  <div
                    className="absolute inset-0 blur-lg"
                    style={{
                      borderRadius: "clamp(20px, 4vw, 32px)",
                      background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                    }}
                  />
                </div>

                {/* Main content */}
                <div
                  id="orgWrap"
                  className="relative z-10"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "clamp(1.5rem, 4vw, 2.5rem)",
                    padding: "clamp(1rem, 3vw, 2rem)",
                    borderRadius: "clamp(20px, 4vw, 32px)",
                    background: "#000000",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    position: "relative",
                    overflow: "visible"
                  }}
                >
                  {/* Founder */}
                  <div style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.6s ease-out 1.0s, transform 0.6s ease-out 1.0s'
                  }}>
                    <TeamCard member={teamMembers.boss} isFounder={true} />
                  </div>

                  {/* Leads */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "1.5rem",
                    width: "100%",
                    maxWidth: "900px",
                    justifyItems: "center",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.6s ease-out 1.2s, transform 0.6s ease-out 1.2s'
                  }}>
                    {teamMembers.leads.map((lead) => (
                      <TeamCard key={lead.id} member={lead} isLead={true} />
                    ))}
                  </div>

                  {/* Teams */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                    width: "100%",
                    maxWidth: "1200px",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 0.8s ease-out 1.4s, transform 0.8s ease-out 1.4s'
                  }}>
                    {/* Technology team */}
                    <div
                      style={{
                        background: "linear-gradient(145deg, rgba(20, 25, 50, 0.6) 0%, rgba(15, 18, 40, 0.4) 100%)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        padding: "clamp(1rem, 3vw, 2rem)",
                        border: "1px solid rgba(41, 98, 255, 0.15)",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <h3 style={{
                        color: "#ffffff",
                        fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
                        fontWeight: "700",
                        marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #2962FF, #00F0FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        Technology
                      </h3>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "1rem",
                        justifyItems: "center"
                      }}>
                        {teamMembers.technology.map((member) => (
                          <TeamCard key={member.id} member={member} />
                        ))}
                      </div>
                    </div>

                    {/* Marketing team */}
                    <div
                      style={{
                        background: "linear-gradient(145deg, rgba(20, 35, 45, 0.6) 0%, rgba(15, 25, 35, 0.4) 100%)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        padding: "clamp(1rem, 3vw, 2rem)",
                        border: "1px solid rgba(0, 240, 255, 0.15)",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <h3 style={{
                        color: "#ffffff",
                        fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
                        fontWeight: "700",
                        marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #00F0FF, #FFB800)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        Marketing
                      </h3>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1rem",
                        justifyItems: "center"
                      }}>
                        {teamMembers.marketing.map((member) => (
                          <TeamCard key={member.id} member={member} />
                        ))}
                      </div>
                    </div>

                    {/* Merchants team */}
                    <div
                      style={{
                        background: "linear-gradient(145deg, rgba(30, 25, 40, 0.6) 0%, rgba(20, 18, 30, 0.4) 100%)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        padding: "clamp(1rem, 3vw, 2rem)",
                        border: "1px solid rgba(255, 184, 0, 0.15)",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <h3 style={{
                        color: "#ffffff",
                        fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
                        fontWeight: "700",
                        marginBottom: "clamp(1rem, 2.5vw, 1.5rem)",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #FFB800, #7B2CBF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        Merchants
                      </h3>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "1rem",
                        justifyItems: "center"
                      }}>
                        {teamMembers.merchants.map((member) => (
                          <TeamCard key={member.id} member={member} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}