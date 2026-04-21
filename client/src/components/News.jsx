import { motion } from 'framer-motion';
import { useState } from 'react';

const svNews = [
  {
    id: 1,
    title: 'StudentVerse Launched in IOS App Store',
    date: 'April 17, 2026',
    excerpt: 'Exciting news for students in Dubai! StudentVerse is now live at UOW, offering exclusive discounts from top brands.',
    category: 'Launch',
    color: '#007AFF'
  },
  {
    id: 2,
    title: "Attractions are coming soon to StudentVerse",
    date: 'April 17, 2026',
    excerpt: "We’re happy to announce that our attractions ticket system is coming soon, bringing you new ways to save everywhere!",
    category: 'Partners',
    color: '#ffb800'
  },
  {
    id: 3,
    title: 'Mystery feature coming soon to StudentVerse',
    date: 'April 21, 2026',
    excerpt: 'We have a surprise in store for our users! Stay tuned for an exciting new feature that will enhance your StudentVerse experience.',
    category: 'Feature',
    color: '#7b2cbf'
  }
];

const androidNews = [
  {
    id: 1,
    title: 'StudentVerse Coming Soon to Android',
    date: 'April 17, 2026',
    excerpt: "Android users, we're working hard to bring StudentVerse to you soon. Stay tuned for exclusive launch updates!",
    category: 'Coming Soon',
    color: '#34A853'
  },
  {
    id: 2,
    title: 'Final Testing Phase for Android',
    date: 'April 17, 2026',
    excerpt: 'We’re in the final testing phase for StudentVerse on Android ahead of the official launch stay tuned.',
    category: 'Launch',
    color: '#34A853'
  },
  {
    id: 3,
    title: 'What to Expect on Android',
    date: 'April 17, 2026',
    excerpt: 'All the features you love on iOS will be available on Android, including SV Orbit AI and instant verified discounts.',
    category: 'Preview',
    color: '#34A853'
  }
];

const iosNews = [
  {
    id: 1,
    title: 'StudentVerse Launched in IOS App Store',
    date: 'April 17, 2026',
    excerpt: 'Exciting news for students in Dubai! StudentVerse is now live at UOW, offering exclusive discounts from top brands.',
    category: 'Launch',
    color: '#007AFF'
  },
  {
    id: 2,
    title: 'Flash & Verify Released',
    date: 'April 17, 2026',
    excerpt: 'Discover new ways to maximize your savings with Flash & Verify, designed to make saving simple and effortless.',
    category: 'Feature',
    color: '#007AFF'
  },
  {
    id: 3,
    title: 'SV app Signup Under Maintenance',
    date: 'April 21, 2026',
    excerpt: 'Due to high volume of sign in requests, our signup system is currently under maintenance. We apologize for any inconvenience and will be back up soon!',
    category: 'Maintenance',
    color: '#007AFF'
  }
];

export default function News() {
  const [platform, setPlatform] = useState('ios');

  const news = platform === 'ios' ? iosNews : platform === 'android' ? androidNews : svNews;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section style={{ padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(315deg, #999, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Latest News
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6
          }}>
            Stay updated with the latest from StudentVerse
          </p>

          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '999px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gap: '2px'
          }}>
            {[
              { key: 'sv', label: 'SV', color: '#7b2cbf' },
              { key: 'android', label: 'Android', color: '#10B981' },
              { key: 'ios', label: 'iOS', color: '#007AFF' }
            ].map((p) => (
              <motion.button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                whileHover={{ x: 4 }}
                whileTap={{ x: -4, scale: 0.98 }}
                style={{
                  background: platform === p.key ? p.color : 'transparent',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '999px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {news.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: `1px solid ${article.color}30`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                borderColor: article.color,
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 30px ${article.color}15`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: article.color
                }}>
                  {article.category}
                </span>

                <span style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.4)'
                }}>
                  {article.date}
                </span>
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '0.75rem',
                lineHeight: 1.3
              }}>
                {article.title}
              </h3>

              <p style={{
                fontSize: '0.95rem',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                margin: 0
              }}>
                {article.excerpt}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding: 60px 15px !important;
          }
        }
      `}</style>
    </section>
  );
}