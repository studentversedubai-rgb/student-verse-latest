import { motion } from 'framer-motion';
import { useState } from 'react';
import { Newspaper, Sparkles, Smartphone } from 'lucide-react';

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
  const tabs = [
    { key: 'sv', label: 'SV', color: '#7b2cbf', icon: Sparkles },
    { key: 'android', label: 'Android', color: '#34A853', icon: Smartphone },
    { key: 'ios', label: 'iOS', color: '#007AFF', icon: Newspaper }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="sv-ui-section" aria-labelledby="latest-news-title">
      <div className="sv-ui-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="sv-section-header"
        >
          <p className="sv-kicker">Product Updates</p>
          <h2 id="latest-news-title" className="sv-heading">
            <span className="sv-heading-gradient">Latest News</span>
          </h2>

          <p className="sv-lead">
            Stay updated with the latest from StudentVerse
          </p>

          <div className="sv-segmented" role="tablist" aria-label="News platform filter">
            {tabs.map((p) => {
              const Icon = p.icon;
              const active = platform === p.key;
              return (
              <motion.button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                whileTap={{ scale: 0.98 }}
                className={`sv-segmented-button ${active ? 'is-active' : ''}`}
                style={{ '--accent': p.color }}
                role="tab"
                aria-selected={active}
                type="button"
              >
                <Icon size={15} aria-hidden="true" />
                {p.label}
              </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="sv-card-grid"
        >
          {news.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              className="sv-surface-card"
              style={{ '--accent': article.color }}
            >
              <div className="sv-card-meta">
                <span className="sv-pill">
                  {article.category}
                </span>

                <span className="sv-card-date">
                  {article.date}
                </span>
              </div>

              <h3 className="sv-card-title">
                {article.title}
              </h3>

              <p className="sv-card-copy">
                {article.excerpt}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
