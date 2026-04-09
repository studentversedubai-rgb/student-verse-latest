import { motion } from 'framer-motion';
import styled from 'styled-components';

const StoreBtn = styled.a`
  background: transparent;
  position: relative;
  padding: 12px 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  transition: color 0.3s 0.1s ease-out;
  border: 1px solid ${p => p['data-color']};
  color: ${p => p['data-color']};
  span { margin: 0 4px; }
  &::before {
    position: absolute;
    top: 0; left: -5em; right: 0; bottom: 0;
    margin: auto; content: '';
    border-radius: 50%; display: block;
    width: 20em; height: 20em;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }
  &:hover { color: #fff; }
  &:hover::before { box-shadow: inset 0 0 0 10em ${p => p['data-color']}; }
  svg { flex-shrink: 0; }
`;

export default function DownloadCTA() {
  return (
    <section className="download-cta-section">
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span style={{ background: 'linear-gradient(315deg, #999, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ready to Start </span>
            <span style={{ background: 'linear-gradient(315deg, #777, #ddd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Saving?</span>
          </motion.h1>

          <motion.p 
            className="cta-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of students already unlocking exclusive discounts at their favorite brands. 
            Download StudentVerse today and flash your way to instant savings!
          </motion.p>

          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StoreBtn href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" data-color="#007AFF">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.02.05-2.25.68-2.98 1.53-.65.76-1.17 1.97-1.02 3.1.01 0 1.13-.48 2.99-.48z"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                <span style={{ fontSize: '0.65rem', opacity: 0.75, fontWeight: 400 }}>Get it now on</span>
                <span>App Store</span>
              </div>
            </StoreBtn>
            <StoreBtn href="https://play.google.com" target="_blank" rel="noopener noreferrer" data-color="#34A853">
              <svg width="22" height="22" viewBox="0 0 512 512" fill="currentColor">
                <path d="M70.667 499.429c-4.114 0-8.093-1.209-11.527-3.499L275.925 279.145l56.21 56.21L98.648 493.228c-8.404 4.131-18.59 6.201-27.981 6.201zM30.118 468.715c-2.731-5.042-4.118-10.731-4.118-16.572V59.857c0-5.731 1.34-11.31 3.97-16.279l196.452 196.452-196.304 228.685zM468.098 219.08l-53.913-30.913-61.938 61.938 61.938 61.938 54.569-31.267c15.496-8.88 24.765-25.077 24.765-42.848s-9.926-33.968-25.421-18.848zM59.14 16.07C62.574 13.78 66.553 12.571 70.667 12.571c9.391 0 19.577 2.07 27.981 6.201l233.787 157.873-56.21 56.21L59.14 16.07z"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                <span style={{ fontSize: '0.65rem', opacity: 0.75, fontWeight: 400 }}>Get it now on</span>
                <span>Google Play</span>
              </div>
            </StoreBtn>
          </motion.div>

          <motion.p 
            className="cta-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Instant access - Download now
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        .download-cta-section {
          padding: 120px 20px;
          position: relative;
          overflow: visible;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content {
          text-align: center;
        }

        .cta-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00f0ff 0%, #2962ff 50%, #7b2cbf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: rgba(255, 255, 255, 0.75);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .store-button {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          min-width: 200px;
          background: #ffffff;
          border: none;
        }

        .store-button.app-store {
          background: #ffffff;
          border: none;
        }

        .store-button.app-store:hover {
          background: #e8e8e8;
          transform: translateY(-2px);
        }

        .store-button.google-play {
          background: #ffffff;
          border: none;
        }

        .store-button.google-play:hover {
          background: #e8e8e8;
          transform: translateY(-2px);
        }

        .store-icon svg {
          fill: #000000;
        }

        .store-label {
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .store-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #000000;
        }

        .cta-note {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 600px) {
          .download-cta-section {
            padding: 80px 16px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .store-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
