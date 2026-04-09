import { useState } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl_v2 } from '../config/api';

const inputStyle = {
  width: '100%',
  padding: 'clamp(0.75rem, 2vw, 1rem)',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  color: 'white',
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  transition: 'all 0.3s ease',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '0.5rem',
  fontSize: '0.9rem',
  fontWeight: '500',
};

const RgbCard = ({ children, style = {} }) => (
  <div style={{ position: 'relative', overflow: 'visible', ...style }}>
    <div className="absolute -inset-[2px] rounded-3xl opacity-80">
      <div className="absolute inset-0" style={{
        borderRadius: '20px',
        background: 'linear-gradient(90deg,#8B5CF6 0%,#EC4899 18%,#FB923C 35%,#3B82F6 52%,#06B6D4 68%,#FB923C 85%,#8B5CF6 100%)',
        backgroundSize: '300% 300%',
        animation: 'rgbBorder 4s linear infinite',
      }} />
      <div className="absolute inset-0 blur-lg" style={{
        borderRadius: '20px',
        background: 'linear-gradient(90deg,rgba(139,92,246,0.4) 0%,rgba(236,72,153,0.4) 20%,rgba(251,146,60,0.35) 40%,rgba(59,130,246,0.4) 60%,rgba(251,146,60,0.35) 80%,rgba(139,92,246,0.4) 100%)',
      }} />
    </div>
    <div style={{
      position: 'relative',
      zIndex: 10,
      background: 'rgba(8,12,31,0.92)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    }}>
      {children}
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 } },
};

const WHY_CARDS = [
  {
    icon: '🎓',
    title: 'Reach Verified Students',
    body: 'Connect with real university students actively looking for deals nearby.',
  },
  {
    icon: '📍',
    title: 'Drive Consistent Traffic',
    body: 'Turn your offers into daily customer visits, not just impressions.',
  },
  {
    icon: '✨',
    title: 'Brand Visibility',
    body: 'Get featured in trending sections, recommendations, and high-visibility placements.',
  },
  {
    icon: '🚀',
    title: 'Simple & Fast Setup',
    body: 'Launch your offer in minutes with zero complexity.',
  },
];

export default function BusinessHero() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    businessType: '',
    location: '',
    offerIdea: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch(getApiUrl_v2('/api/contact/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.contactPerson,
          lastName: formData.businessName,
          email: formData.email,
          message: `Business Type: ${formData.businessType}\nLocation: ${formData.location}\nOffer/Partnership Idea: ${formData.offerIdea}\n\n${formData.message}`,
          inquiryType: 'merchant_business',
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit');
      setIsSubmitted(true);
      setFormData({ businessName: '', contactPerson: '', email: '', businessType: '', location: '', offerIdea: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', padding: '3rem', background: 'rgba(8,12,31,0.92)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '2px solid transparent', backgroundImage: 'linear-gradient(rgba(8,12,31,0.92),rgba(8,12,31,0.92)),linear-gradient(45deg,#2962FF,#FFB800,#7B2CBF)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box,border-box', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', maxWidth: '500px', position: 'relative', zIndex: 10 }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(45deg,#2962FF,#00F0FF)', borderRadius: '50%', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,240,255,0.5)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(315deg,#999,#fff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Inquiry Sent!</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '2rem' }}>Thanks for reaching out. Our partnerships team will get back to you within 24 hours.</p>
          <button onClick={() => setIsSubmitted(false)} style={{ background: 'linear-gradient(90deg,#2962FF,#7B2CBF,#FFB800)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 20px rgba(41,98,255,0.4)' }}>Submit Another Inquiry</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '2rem', paddingBottom: '4rem', zIndex: 1 }}>
      {/* Subtle ambient glows — no black overlay */}
      <motion.div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(41,98,255,0.07) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div style={{ position: 'absolute', top: '60%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(255,184,0,0.05) 0%,transparent 70%)', borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} animate={{ y: [20, -20, 20] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem,3vw,2rem)', position: 'relative', zIndex: 10 }}>
        {/* Hero heading */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} style={{ textAlign: 'center', marginBottom: 'clamp(2rem,5vw,3rem)' }}>
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem,8vw,5rem)', fontWeight: '700', background: 'linear-gradient(315deg,#999,#fff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Grow with StudentVerse
          </motion.h1>
          <motion.p variants={itemVariants} style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Reach thousands of students, increase foot traffic, and turn offers into loyal customers.
          </motion.p>
        </motion.div>

        {/* Two left cards + right form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(1.5rem,4vw,2.5rem)', alignItems: 'start' }}>
          {/* Left cards */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Card — How It Works */}
            <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
              <RgbCard>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(45deg,#FFB800,#FF6B00)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(255,184,0,0.3)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" /><path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>How It Works</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[['1', 'Add your business', '#2962FF'], ['2', 'Create your offer', '#FFB800'], ['3', 'Start getting customers', '#00F0FF']].map(([num, text, color]) => (
                    <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', color: '#000', flexShrink: 0 }}>{num}</div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </RgbCard>
            </motion.div>
          </motion.div>

          {/* Right — Partnership Form */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} style={{ position: 'relative', overflow: 'visible' }}>
            <div className="absolute -inset-[2px] rounded-3xl opacity-80">
              <div className="absolute inset-0" style={{ borderRadius: '20px', background: 'linear-gradient(90deg,#8B5CF6 0%,#EC4899 18%,#FB923C 35%,#3B82F6 52%,#06B6D4 68%,#FB923C 85%,#8B5CF6 100%)', backgroundSize: '300% 300%', animation: 'rgbBorder 4s linear infinite' }} />
              <div className="absolute inset-0 blur-lg" style={{ borderRadius: '20px', background: 'linear-gradient(90deg,rgba(139,92,246,0.4) 0%,rgba(236,72,153,0.4) 20%,rgba(251,146,60,0.35) 40%,rgba(59,130,246,0.4) 60%,rgba(251,146,60,0.35) 80%,rgba(139,92,246,0.4) 100%)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 10, background: 'rgba(8,12,31,0.92)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: 'clamp(1.5rem,4vw,2.5rem)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: '600', color: 'white', marginBottom: 'clamp(1rem,3vw,1.5rem)', textAlign: 'center' }}>Become a Partner</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2.5vw,1.25rem)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem,2vw,1rem)' }}>
                  <div>
                    <label style={labelStyle}>Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required style={inputStyle} placeholder="Your business name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Contact Person</label>
                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required style={inputStyle} placeholder="Your name" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={inputStyle} placeholder="careers@studentverse.app" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem,2vw,1rem)' }}>
                  <div>
                    <label style={labelStyle}>Business Type</label>
                    <select name="businessType" value={formData.businessType} onChange={handleInputChange} required style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)' }}>
                      <option value="" style={{ background: '#0d1117', color: 'white' }}>Select type</option>
                      {['Restaurant / Cafe', 'Entertainment', 'Fitness', 'Retail', 'Services', 'Education', 'Beauty / Wellness', 'Other'].map(opt => (
                        <option key={opt} value={opt} style={{ background: '#0d1117', color: 'white' }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} required style={inputStyle} placeholder="City, Area" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Offer / Partnership Idea</label>
                  <input type="text" name="offerIdea" value={formData.offerIdea} onChange={handleInputChange} required style={inputStyle} placeholder="e.g. 20% student discount, free trial..." />
                </div>
                <div>
                  <label style={labelStyle}>Optional Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} placeholder="Tell us about your business, the type of offer you want to provide, or how you'd like to partner with StudentVerse." />
                </div>
                {error && <div style={{ padding: '1rem', background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)', borderRadius: '10px', color: '#FF3B30', fontSize: '0.9rem' }}>{error}</div>}
                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: 'linear-gradient(90deg,#2962FF,#7B2CBF,#FFB800)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 20px rgba(41,98,255,0.4)', opacity: isSubmitting ? 0.7 : 1, transition: 'opacity 0.3s' }}>
                  {isSubmitting ? 'Submitting...' : 'Join StudentVerse'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Why Businesses Choose StudentVerse */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ marginTop: 'clamp(4rem,8vw,6rem)', textAlign: 'center' }}>
          <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: '700', background: 'linear-gradient(315deg,#999,#fff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
            Why Businesses Choose StudentVerse
          </motion.h2>
          <motion.p variants={itemVariants} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
            Everything you need to reach the student market, in one place.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
            {WHY_CARDS.map((card, i) => (
              <motion.div key={card.title} variants={itemVariants} whileHover={{ y: -6, scale: 1.03 }} transition={{ duration: 0.3 }}>
                <RgbCard style={{}}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>{card.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{card.body}</p>
                </RgbCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }} style={{ marginTop: 'clamp(4rem,8vw,6rem)', textAlign: 'center', padding: 'clamp(2.5rem,6vw,4rem) clamp(1.5rem,4vw,3rem)', background: 'rgba(8,12,31,0.7)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(41,98,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: '700', background: 'linear-gradient(315deg,#999,#fff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            Ready to reach more students?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
            Join StudentVerse and turn your offers into real engagement.
          </p>
          <motion.a href="#partner-form" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'inline-block', background: 'linear-gradient(90deg,#2962FF,#7B2CBF,#FFB800)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 30px rgba(41,98,255,0.5)', textDecoration: 'none', position: 'relative', zIndex: 1 }}>
            Partner With StudentVerse
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
