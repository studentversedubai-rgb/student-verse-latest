import { motion } from 'framer-motion';
import ElectricBorder from './ElectricBorder';

export default function Features() {
  const features = [
    {
      id: 'cyan',
      title: 'Verified Digital ID',
      description: 'Forget the plastic card. Carry your official student status with dynamic, fraud-proof Rolling QR technology.',
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
      title: 'Instant Savings',
      description: 'Use SV Pay to tap and redeem discounts at top brands. From coffee runs to cinema nights, Unlock Student Discounts.',
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
      title: 'SV Orbit AI',
      description: 'Your personal AI planner. Tell Orbit your budget and vibe, and it builds your entire itinerary.',
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id="Features-homepage">
      <div className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="section-center-text" style={{ marginTop: '0' }}>
            <div className="section-title xl">
              <motion.div 
                className="fade-in-on-scroll"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="title medium">How it Works</h2>
              </motion.div>
            </div>

            <div className="feature-section">
              <motion.div 
                className="feature-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {features.map((feature) => (
                  <ElectricBorder
                    key={feature.id}
                    color={feature.color}
                    speed={1}
                    chaos={0.12}
                    borderRadius={24}
                    style={{ height: '100%' }}
                  >
                    <motion.div 
                      className={`feature-card ${feature.id}`}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                      style={{ 
                        position: 'relative',
                        zIndex: 10,
                        background: '#000000',
                        height: '100%'
                      }}
                    >
                      <div className={`feature-card-glow ${feature.id}`}></div>
                      <motion.div 
                        className="feature-icon-container"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h2 className="feature-title">{feature.title}</h2>
                      <p className="feature-description">{feature.description}</p>
                    </motion.div>
                  </ElectricBorder>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}