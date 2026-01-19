import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      id: 'cyan',
      title: 'Verified Digital ID',
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
      title: 'Instant Savings',
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
                  <motion.div
                    key={feature.id}
                    variants={cardVariants}
                    whileHover={{ y: -10 }}
                    className="relative rounded-3xl overflow-visible"
                  >
                    {/* Animated gradient border orbit - same as BentoDashboard */}
                    <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 18%, #FB923C 35%, #3B82F6 52%, #06B6D4 68%, #FB923C 85%, #8B5CF6 100%)",
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
                      {/* Soft multi-color glow effect */}
                      <div
                        className="absolute inset-0 rounded-3xl blur-lg"
                        style={{
                          background: "linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 20%, rgba(251, 146, 60, 0.35) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(251, 146, 60, 0.35) 80%, rgba(139, 92, 246, 0.4) 100%)"
                        }}
                      />
                    </div>

                    {/* Card content with black background */}
                    <div className="relative bg-black rounded-3xl border-2 border-transparent p-5 sm:p-6 lg:p-8 z-10">
                      <motion.div
                        style={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          color: '#ffffff'
                        }}
                        className="feature-card-content"
                      >
                        <motion.div
                          className="feature-icon-container"
                          style={{ color: feature.color, marginBottom: '20px' }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {feature.icon}
                        </motion.div>

                        <h2 className="feature-title" style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: '600' }}>
                          {feature.title}
                        </h2>

                        <p className="feature-description" style={{ opacity: 0.8, lineHeight: '1.6', textAlign: 'center' }}>
                          {feature.description}
                        </p>
                      </motion.div>
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