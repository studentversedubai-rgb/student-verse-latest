import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  const trackRef = useRef(null);

  const features = [
    {
      id: 'cyan',
      step: '01',
      eyebrow: 'FLASH VERIFY',
      title: 'Verify Your Student ID',
      description: 'Forget the plastic card. Carry your official student status with a dynamic, animated ID. Just Flash & Verify to earn your rewards.',
      color: '#00f0ff',
      icon: (
        <svg className="feature-icon cyan-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L20 20 L20 45 C20 65 35 80 50 90 C65 80 80 65 80 45 L80 20 Z" fill="none" stroke="currentColor" strokeWidth="3"></path>
          <path d="M50 25 L30 35 L30 50 C30 62 40 72 50 80 C60 72 70 62 70 50 L70 35 Z" fill="none" stroke="currentColor" strokeWidth="2"></path>
        </svg>
      )
    },
    {
      id: 'yellow',
      step: '02',
      eyebrow: 'LIVE DEALS',
      title: 'Discover Instant Rewards',
      description: 'Unlock exclusive perks at your favorite spots. From coffee runs to cinema nights, just show your StudentVerse ID to save instantly.',
      color: '#ffb800',
      icon: (
        <svg className="feature-icon yellow-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20 L50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="currentColor" strokeWidth="3"></path>
          <circle cx="35" cy="35" fill="currentColor" r="5"></circle>
          <path d="M70 25 L72 20 L74 25 L79 27 L74 29 L72 34 L70 29 L65 27 Z" fill="currentColor"></path>
          <path d="M25 70 L27 65 L29 70 L34 72 L29 74 L27 79 L25 74 L20 72 Z" fill="currentColor"></path>
          <circle cx="42" cy="42" fill="currentColor" r="3"></circle>
          <line stroke="currentColor" strokeWidth="2.5" x1="40" x2="58" y1="44" y2="56"></line>
          <circle cx="58" cy="58" fill="currentColor" r="3"></circle>
        </svg>
      )
    },
    {
      id: 'purple',
      step: '03',
      eyebrow: 'SV ORBIT',
      title: 'SV Orbit AI',
      description: 'Your personal AI companion that learns and adapts to your needs, understanding your mood, preferences, and epic weekend adventures',
      color: '#c42878',
      icon: (
        <svg className="feature-icon purple-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" fill="none" rx="22" ry="22" stroke="currentColor" strokeWidth="3"></ellipse>
          <ellipse cx="50" cy="50" fill="none" rx="38" ry="12" stroke="currentColor" strokeWidth="2.5" transform="rotate(-20 50 50)"></ellipse>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const track = trackRef.current;
    const cards = ['hiw-card0', 'hiw-card1', 'hiw-card2'].map((id) => document.getElementById(id));
    const fill = document.getElementById('hiw-conn-fill');
    const timers = [];

    if (!track || !fill || cards.some((card) => !card)) {
      return undefined;
    }

    function runAnimation() {
      cards[0].classList.add('visible');

      timers.push(window.setTimeout(() => {
        fill.style.width = '50%';
      }, 400));

      timers.push(window.setTimeout(() => {
        cards[1].classList.add('visible');
      }, 800));

      timers.push(window.setTimeout(() => {
        fill.style.width = '100%';
      }, 900));

      timers.push(window.setTimeout(() => {
        cards[2].classList.add('visible');
      }, 1300));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px'
    });

    observer.observe(track);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div id="Features-homepage">
      <div className="section" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-center-text" style={{ marginTop: '0' }}>
            <div className="section-title xl">
              <motion.div
                className="fade-in-on-scroll"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="title medium">How it Works</h2>
              </motion.div>
            </div>

            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto 3rem auto',
                lineHeight: 1.6
              }}
            >
              Get exclusive student discounts in three simple steps. Your wallet will thank you.
            </motion.p>

            <div className="process-section">
              <div
                id="hiw-track"
                ref={trackRef}
                className="process-container"
              >
                <div className="hiw-connector-wrap" aria-hidden="true">
                  <div className="hiw-connector-bg"></div>
                  <div className="hiw-connector-fill" id="hiw-conn-fill"></div>
                </div>

                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="process-item"
                    id={`hiw-card${index}`}
                    style={{ '--feature-accent': feature.color }}
                  >
                    <div className="process-content">
                      <div className="process-icon-wrapper" style={{ color: feature.color }}>
                        {feature.icon}
                      </div>

                      <div className="process-step-number" style={{ color: feature.color }}>
                        {feature.step}
                      </div>

                      <div className="process-eyebrow" style={{ color: feature.color }}>
                        {feature.eyebrow}
                      </div>

                      <h3 className="process-title">{feature.title}</h3>
                      <p className="process-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
