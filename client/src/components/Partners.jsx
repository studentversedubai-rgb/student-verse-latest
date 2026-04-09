import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: "Centrepoint",   logo: "/assets/centrepoint.png" },
  { name: "Filli",         logo: "/assets/filli.png" },
  { name: "West Zone",     logo: "/assets/westzone.png" },
  { name: "Bikanervala",   logo: "/assets/bikanervala.avif" },
  { name: "Puranmal",      logo: "/assets/puranmal.png" },
  { name: "Coffee Planet", logo: "/assets/coffeeplannet.png" },
  { name: "Rayna Tours",   logo: "/assets/raynatourslogo.png" },
  { name: "Max",           logo: "/assets/max.webp" },
];

const CELLS = 6;
const INTERVAL_MS = 2000;
const CELLS_PER_TICK = 2;

function pickBrand(currentCells, cellIndex) {
  const skip = currentCells[cellIndex].brandIndex;
  let candidate;
  let attempts = 0;
  do {
    candidate = Math.floor(Math.random() * brands.length);
    const countInUse = currentCells.filter(
      (c, i) => i !== cellIndex && c.brandIndex === candidate
    ).length;
    if (candidate !== skip && countInUse < 2) break;
    attempts++;
    if (attempts >= 20) {
      // fallback: any brand that isn't the current one
      candidate = (skip + 1 + Math.floor(Math.random() * (brands.length - 1))) % brands.length;
      break;
    }
  } while (true);
  return candidate;
}

function LogoGrid() {
  const [cells, setCells] = useState(() =>
    Array.from({ length: CELLS }, (_, i) => ({
      brandIndex: i % brands.length,
      visible: true,
      entering: false,
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const toRotate = [];
      while (toRotate.length < CELLS_PER_TICK) {
        const pick = Math.floor(Math.random() * CELLS);
        if (!toRotate.includes(pick)) toRotate.push(pick);
      }

      // Step 1 — fade out + slide up
      setCells((prev) => {
        const next = prev.map((c) => ({ ...c }));
        toRotate.forEach((i) => { next[i] = { ...next[i], visible: false, entering: false }; });
        return next;
      });

      // Step 2 — swap brand, set entering: true (positions new logo below, no transition yet)
      setTimeout(() => {
        setCells((prev) => {
          const next = prev.map((c) => ({ ...c }));
          toRotate.forEach((i) => {
            const nextBrand = pickBrand(next, i);
            next[i] = { brandIndex: nextBrand, visible: false, entering: true };
          });
          return next;
        });
      }, 500);

      // Step 3 — trigger slide up + fade in
      setTimeout(() => {
        setCells((prev) => {
          const next = prev.map((c) => ({ ...c }));
          toRotate.forEach((i) => { next[i] = { ...next[i], visible: true, entering: false }; });
          return next;
        });
      }, 550);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '3rem',
    }}>
      {cells.map((cell, i) => {
        const brand = brands[cell.brandIndex];
        return (
          <div key={i} style={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              opacity: cell.visible ? 1 : 0,
              transform: cell.entering
                ? 'translateY(8px)'
                : cell.visible
                  ? 'translateY(0px)'
                  : 'translateY(-8px)',
              transition: cell.entering
                ? 'none'
                : 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <img
                src={brand.logo}
                alt={brand.name}
                style={{ height: 72, width: 'auto', maxWidth: 160, objectFit: 'contain', filter: 'brightness(1.15)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Partners() {
  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '1rem',
          }}>
            <span style={{ background: 'linear-gradient(315deg, #999, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Partner</span>{' '}
            <span style={{ background: 'linear-gradient(315deg, #777, #ddd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Merchants</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            Exclusive deals from your favorite brands, ready to unlock with your student ID.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <LogoGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}
        >
          Are you a merchant?{' '}
          <a href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600 }}>
            Partner with us
          </a>{' '}
          to reach thousands of students.
        </motion.div>
      </div>
    </section>
  );
}
