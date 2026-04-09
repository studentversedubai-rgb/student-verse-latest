import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function Counter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { if (isInView) motionValue.set(value); }, [isInView, value, motionValue]);
  useEffect(() => {
    const unsub = springValue.on('change', (v) => setDisplay(Math.floor(v)));
    return () => unsub();
  }, [springValue]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const secondary = [
    { value: 50, suffix: '+', label: 'Partner Brands' },
    { value: 30,  suffix: '.9%', label: 'Avg. Savings'   },
    { value: 8,   suffix: '+', label: 'Universities'   },
  ];

  return (
    <section ref={ref} style={{ padding: '160px 20px', position: 'relative', overflow: 'hidden' }}>

      {/* Purple glow behind the big number */}
      <div style={{
        position: 'absolute', top: '50%', left: '0%',
        transform: 'translateY(-50%)',
        width: '70vw', height: '70vw', maxWidth: '800px', maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(123,44,191,0.2) 0%, rgba(123,44,191,0.07) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontWeight: 600 }}
        >
          By the numbers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            <span style={{ background: 'linear-gradient(315deg, #999, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Why Students</span>{' '}
            <span style={{ background: 'linear-gradient(315deg, #777, #ddd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Love StudentVerse</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '520px', lineHeight: 1.6 }}>
            Join thousands of students saving big on their favorite brands every day.
          </p>
        </motion.div>

        {/* Main layout: giant number left, stats column right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }} className="stats-asymmetric">

          {/* Giant 5,000+ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div style={{
              fontSize: 'clamp(7rem, 20vw, 18rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              background: 'linear-gradient(315deg, #666, #fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              <Counter value={3000} suffix="+" duration={2.5} />
            </div>
            <p style={{
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)',
              fontWeight: 400, maxWidth: '340px', lineHeight: 1.6,
              marginTop: '1.5rem',
            }}>
              Students already saving with StudentVerse every day.
            </p>
          </motion.div>

          {/* Secondary stats — clean right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingLeft: '4rem', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {secondary.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              >
                <div style={{
                  fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 900,
                  lineHeight: 1, marginBottom: '0.4rem',
                  background: 'linear-gradient(315deg, #888, #fff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500, margin: 0 }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .stats-asymmetric { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stats-asymmetric > div:last-child { padding-left: 0 !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07); padding-top: 2.5rem; }
        }
      `}</style>
    </section>
  );
}
