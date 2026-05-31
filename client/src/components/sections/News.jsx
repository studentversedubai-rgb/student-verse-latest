import { motion } from 'framer-motion';
import { useState } from 'react';
import { CalendarDays, Satellite } from 'lucide-react';

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
    <section className="space-news-section">
      <div className="space-news-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="space-news-header"
        >
          <h2 className="space-news-title">
            Latest News
          </h2>

          <p className="space-news-subtitle">
            Stay updated with the latest from StudentVerse
          </p>

          <div className="space-news-tabs">
            {[
              { key: 'sv', label: 'SV', color: '#7b2cbf' },
              { key: 'android', label: 'Android', color: '#10B981' },
              { key: 'ios', label: 'iOS', color: '#007AFF' }
            ].map((p) => (
              <motion.button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={platform === p.key ? 'space-news-tab active' : 'space-news-tab'}
                style={{
                  '--tab-color': p.color
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
          className="space-news-grid"
        >
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              className="space-news-card"
              style={{
                '--article-color': article.color,
              }}
              whileHover={{
                y: -6
              }}
            >
              <div className="space-news-orbit" />

              <div className="space-news-card-top">
                <span className="space-news-category">{article.category}</span>
                <span className="space-news-index">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="space-news-card-title">
                {article.title}
              </h3>

              <p className="space-news-card-copy">
                {article.excerpt}
              </p>

              <div className="space-news-card-footer">
                <span><CalendarDays size={14} />{article.date}</span>
                <Satellite size={17} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .space-news-section {
          position: relative;
          overflow: hidden;
          padding: 84px 20px;
          background: transparent;
        }

        .space-news-shell {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          isolation: isolate;
        }

        .space-news-shell::before {
          content: '';
          position: absolute;
          inset: 5% -6% auto;
          height: 260px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 28% 50%, rgba(0,240,255,0.11), transparent 34%),
            radial-gradient(circle at 72% 50%, rgba(123,44,191,0.12), transparent 38%);
          filter: blur(42px);
          opacity: 0.8;
          pointer-events: none;
          z-index: -1;
        }

        .space-news-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .space-news-title {
          margin: 0 0 1rem;
          font-size: clamp(2.5rem, 5.5vw, 4.8rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: 0;
          background: linear-gradient(315deg, #ffffff 0%, #d7ddeb 48%, #8b94aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .space-news-subtitle {
          max-width: 600px;
          margin: 0 auto 2rem;
          color: rgba(232,238,255,0.68);
          font-size: 1.05rem;
          line-height: 1.65;
        }

        .space-news-tabs {
          display: inline-flex;
          gap: 4px;
          padding: 5px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(8,12,31,0.58);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 36px rgba(0,0,0,0.28);
          backdrop-filter: blur(16px);
        }

        .space-news-tab {
          border: 0;
          border-radius: 999px;
          padding: 0.64rem 1.35rem;
          color: rgba(255,255,255,0.72);
          background: transparent;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }

        .space-news-tab.active {
          color: #fff;
          background:
            radial-gradient(circle at 28% 0%, color-mix(in srgb, var(--tab-color) 28%, transparent), transparent 58%),
            rgba(255,255,255,0.08);
          box-shadow: 0 0 18px color-mix(in srgb, var(--tab-color) 24%, transparent);
        }

        .space-news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: clamp(1.15rem, 2vw, 1.6rem);
        }

        .space-news-card {
          position: relative;
          min-height: 275px;
          padding: 1.35rem;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.11);
          background:
            radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--article-color) 18%, transparent), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025)),
            rgba(8,12,31,0.64);
          box-shadow:
            0 22px 60px rgba(0,0,0,0.34),
            0 0 26px color-mix(in srgb, var(--article-color) 14%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.14);
          overflow: hidden;
          cursor: pointer;
          backdrop-filter: blur(18px) saturate(1.25);
          -webkit-backdrop-filter: blur(18px) saturate(1.25);
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }

        .space-news-card:hover {
          border-color: color-mix(in srgb, var(--article-color) 44%, rgba(255,255,255,0.14));
          box-shadow:
            0 28px 72px rgba(0,0,0,0.44),
            0 0 36px color-mix(in srgb, var(--article-color) 22%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }

        .space-news-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--article-color) 64%, transparent), rgba(255,255,255,0.1), transparent 70%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .space-news-orbit {
          position: absolute;
          right: -48px;
          top: -52px;
          width: 132px;
          height: 132px;
          border-radius: 50%;
          border: 1px solid color-mix(in srgb, var(--article-color) 32%, transparent);
          box-shadow: inset 0 0 32px color-mix(in srgb, var(--article-color) 12%, transparent);
          opacity: 0.65;
        }

        .space-news-card-top,
        .space-news-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .space-news-category {
          display: inline-flex;
          align-items: center;
          padding: 0.42rem 0.72rem;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--article-color) 34%, rgba(255,255,255,0.1));
          color: var(--article-color);
          background: color-mix(in srgb, var(--article-color) 12%, transparent);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .space-news-index {
          color: color-mix(in srgb, var(--article-color) 66%, rgba(255,255,255,0.2));
          font-size: 0.86rem;
          font-weight: 900;
        }

        .space-news-card-title {
          position: relative;
          z-index: 1;
          margin: 1.35rem 0 0.8rem;
          color: #fff;
          font-size: clamp(1.15rem, 1.7vw, 1.38rem);
          font-weight: 850;
          line-height: 1.2;
          letter-spacing: 0;
        }

        .space-news-card-copy {
          position: relative;
          z-index: 1;
          margin: 0;
          color: rgba(232,238,255,0.66);
          font-size: 0.95rem;
          line-height: 1.62;
        }

        .space-news-card-footer {
          margin-top: 1.45rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          color: rgba(232,238,255,0.46);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .space-news-card-footer span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .space-news-card-footer > svg {
          color: var(--article-color);
          filter: drop-shadow(0 0 8px color-mix(in srgb, var(--article-color) 44%, transparent));
        }

        @media (max-width: 768px) {
          .space-news-section {
            padding: 60px 15px !important;
          }

          .space-news-tabs {
            width: 100%;
            justify-content: center;
          }

          .space-news-tab {
            flex: 1;
            padding-inline: 0.8rem;
          }

          .space-news-card {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
