import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      id: 'cyan',
      step: '01',
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

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
              <motion.div
                className="process-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    variants={itemVariants}
                    className="process-item"
                  >
                    <div className="process-connector">
                      {index < features.length - 1 && <div className="connector-line"></div>}
                    </div>

                    <div className="process-content">
                      <div className="process-icon-wrapper" style={{ color: feature.color }}>
                        {feature.icon}
                      </div>

                      <div className="process-step-number" style={{ color: feature.color }}>
                        {feature.step}
                      </div>

                      <h3 className="process-title">{feature.title}</h3>
                      <p className="process-description">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
