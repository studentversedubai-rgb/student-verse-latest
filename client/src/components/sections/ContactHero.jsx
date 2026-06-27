import { useState } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl_v2 } from '../../config/api';
import { CheckCircle } from 'lucide-react';
import SubmitButton from '../ui/SubmitButton';

const underlineInput = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const underlineLabel = {
  display: 'block',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '0.4rem',
  fontSize: '0.8rem',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const WHY_CARDS = [
  {
    title: 'Student Audience',
    body: 'Reach students when they are actively choosing where to eat, shop, study, and spend time.',
    color: '#2962ff',
  },
  {
    title: 'More Foot Traffic',
    body: 'Turn student-only offers into real visits, repeat customers, and stronger local awareness.',
    color: '#ff9800',
  },
  {
    title: 'Brand Visibility',
    body: 'Show up inside a student-focused experience instead of competing for attention on generic channels.',
    color: '#7b2cbf',
  },
  {
    title: 'Easy Partnership',
    body: 'Keep onboarding, offer setup, and communication straightforward from the first conversation.',
    color: '#2962ff',
  },
];

const CheckSVG = () => (
  <svg version="1.0" preserveAspectRatio="xMidYMid meet" height={16} viewBox="0 0 30 30.000001" width={16} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="checkClip">
        <path fill="#664eff" clipRule="nonzero" d="M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#checkClip)">
      <path fillRule="nonzero" fillOpacity={1} d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z" fill="#664eff" />
    </g>
  </svg>
);

export default function ContactHero() {
  const [mode, setMode] = useState('business');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', businessType: '', location: '', subject: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Support ticket form state
  const [supportForm, setSupportForm] = useState({ name: '', email: '', priority: '', category: '', message: '' });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportErrors, setSupportErrors] = useState({});

  const validateSupport = () => {
    const e = {};
    if (!supportForm.name.trim()) e.name = 'Required';
    if (!supportForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportForm.email)) e.email = 'Valid email required';
    if (!supportForm.priority) e.priority = 'Required';
    if (!supportForm.category) e.category = 'Required';
    if (!supportForm.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const errs = validateSupport();
    if (Object.keys(errs).length) { setSupportErrors(errs); return; }
    const body = `Name: ${supportForm.name}\nEmail: ${supportForm.email}\nPriority: ${supportForm.priority}\nCategory: ${supportForm.category}\n\n${supportForm.message}`;
    window.location.href = `mailto:support@studentverse.ae?subject=Support Ticket [${supportForm.category}] - ${supportForm.priority} Priority&body=${encodeURIComponent(body)}`;
    setSupportSubmitted(true);
  };

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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: `Subject: ${formData.subject}\nBusiness Type: ${formData.businessType}\nLocation: ${formData.location}\n\n${formData.message}`,
          inquiryType: 'merchant_business',
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit');
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', businessType: '', location: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldStyle = (name) => ({
    ...underlineInput,
    borderBottomColor: focusedField === name ? '#ff9800' : 'rgba(255,255,255,0.2)',
    outline: 'none',
  });

  // Toggle pill
  const Toggle = (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '9rem clamp(1rem, 4vw, 2rem) 0' }}>
      <div className="sv-segmented" role="tablist" aria-label="Contact type">
        {[
          { key: 'business', label: 'Business', color: '#ff9800' },
          { key: 'student', label: 'Support', color: '#9c27b0' },
        ].map(m => {
          return (
          <motion.button
            key={m.key}
            onClick={() => setMode(m.key)}
            whileTap={{ scale: 0.98 }}
            className={`sv-segmented-button ${mode === m.key ? 'is-active' : ''}`}
            style={{ '--accent': m.color }}
            role="tab"
            aria-selected={mode === m.key}
            type="button">
            {m.label}
          </motion.button>
          );
        })}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle size={64} color="#00f0ff" />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>Message sent.</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            We'll get back to you within 24 hours.
          </p>
          <button onClick={() => setIsSubmitted(false)}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.75rem 2rem', borderRadius: '50px', fontSize: '0.95rem', cursor: 'pointer' }}>
            Send another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      {Toggle}

      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(41,98,255,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '0%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(123,44,191,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {mode === 'student' ? (
        /* SUPPORT MODE — Ticket Form */
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(1rem,2vw,2rem) clamp(1.5rem,4vw,3rem) 4rem', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="sv-section-header" style={{ marginBottom: '2.5rem' }}>
              <p className="sv-kicker">Student Help Desk</p>
              <h1 className="sv-heading"><span className="sv-heading-gradient">Support Center</span></h1>
              <p className="sv-lead">
                Having an issue? Submit a ticket and we will route it to the right place.
              </p>
            </div>

            {supportSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="sv-form-card sv-form-transparent" style={{ textAlign: 'center', '--accent': '#00f0ff' }}>
                <CheckCircle size={56} color="#00f0ff" style={{ marginBottom: '1rem' }} />
                <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ticket Submitted!</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  Our support team will reach out to you at <strong style={{ color: '#00f0ff' }}>{supportForm.email}</strong> shortly.
                </p>
                <button onClick={() => { setSupportSubmitted(false); setSupportForm({ name: '', email: '', priority: '', category: '', message: '' }); }}
                  style={{ marginTop: '1.5rem', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Submit another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="sv-form-card sv-form-transparent" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', '--accent': '#9c27b0' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Your Name</label>
                  <input style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    type="text" value={supportForm.name} onChange={e => setSupportForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" />
                  {supportErrors.name && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' }}>{supportErrors.name}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Your Email</label>
                  <input style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    type="email" value={supportForm.email} onChange={e => setSupportForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />
                  {supportErrors.email && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' }}>{supportErrors.email}</p>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Priority</label>
                    <select style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                      value={supportForm.priority} onChange={e => setSupportForm(p => ({ ...p, priority: e.target.value }))}>
                      <option value="" style={{ background: '#0d1117' }}>Select</option>
                      {['Low', 'Medium', 'High'].map(o => <option key={o} value={o} style={{ background: '#0d1117' }}>{o}</option>)}
                    </select>
                    {supportErrors.priority && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' }}>{supportErrors.priority}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Category</label>
                    <select style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                      value={supportForm.category} onChange={e => setSupportForm(p => ({ ...p, category: e.target.value }))}>
                      <option value="" style={{ background: '#0d1117' }}>Select</option>
                      {['Account', 'Payments', 'Partnerships', 'App Bug', 'Other'].map(o => <option key={o} value={o} style={{ background: '#0d1117' }}>{o}</option>)}
                    </select>
                    {supportErrors.category && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' }}>{supportErrors.category}</p>}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Describe your issue</label>
                  <textarea style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '120px' }}
                    rows={4} value={supportForm.message} onChange={e => setSupportForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us what's happening..." />
                  {supportErrors.message && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' }}>{supportErrors.message}</p>}
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <SubmitButton label="Submit Ticket" />
                </div>
              </form>
            )}
          </motion.div>
        </div>
      ) : (
        /* BUSINESS MODE */
        <>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem) 4rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 8vw, 8rem)', alignItems: 'start',
            position: 'relative', zIndex: 1,
          }} className="contact-grid">

            {/* LEFT */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              style={{ paddingTop: '2rem' }}>
              <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#00f0ff', marginBottom: '2rem', fontWeight: 600 }} />
              <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '2.5rem', letterSpacing: '-0.025em' }}>
                <span style={{ background: 'linear-gradient(135deg, #ff6a00 0%, #ff9800 50%, #ffb74d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Want to partner</span><br />
                <span style={{ background: 'linear-gradient(135deg, #ffb74d 0%, #ff9800 50%, #ff6a00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>with us?</span>
              </motion.h1>
              <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '420px' }}>
                Looking to get your brand in front of thousands of students? Fill out the form and we'll take it from there.
              </motion.p>
              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Email', value: 'Partners@studentverse.ae' },
                  { label: 'Based in', value: 'Dubai, UAE' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>{label}</p>
                    <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ paddingTop: '2rem' }}>
              <form onSubmit={handleSubmit} className="sv-form-card sv-form-transparent" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', '--accent': '#ff9800' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={underlineLabel}>Business Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                      onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)}
                      style={fieldStyle('firstName')} placeholder="Your business name" />
                  </div>
                  <div>
                    <label style={underlineLabel}>Your Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                      onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)}
                      style={fieldStyle('lastName')} placeholder="Your name" />
                  </div>
                </div>
                <div>
                  <label style={underlineLabel}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    style={fieldStyle('email')} placeholder="business@example.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={underlineLabel}>Business Type</label>
                    <select name="businessType" value={formData.businessType} onChange={handleInputChange}
                      onFocus={() => setFocusedField('businessType')} onBlur={() => setFocusedField(null)}
                      style={{ ...underlineInput, cursor: 'pointer' }}>
                      <option value="" style={{ background: '#0d1117', color: 'white' }}>Select type</option>
                      {['Restaurant / Cafe', 'Entertainment', 'Fitness', 'Retail', 'Services', 'Education', 'Beauty / Wellness', 'Other'].map(opt => (
                        <option key={opt} value={opt} style={{ background: '#0d1117', color: 'white' }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={underlineLabel}>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange}
                      onFocus={() => setFocusedField('location')} onBlur={() => setFocusedField(null)}
                      style={fieldStyle('location')} placeholder="City, Area" />
                  </div>
                </div>
                <div>
                  <label style={underlineLabel}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    style={{ ...fieldStyle('message'), resize: 'none' }}
                    placeholder="Tell us what's on your mind..." />
                </div>
                {error && <p style={{ color: '#ff4444', fontSize: '0.9rem' }}>{error}</p>}
                <SubmitButton label={isSubmitting ? 'Sending...' : 'Submit'} disabled={isSubmitting} />
              </form>
            </motion.div>
          </div>

          {/* Why Businesses Choose StudentVerse */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem)', position: 'relative', zIndex: 1 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="sv-kicker">For Partners</p>
              <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '0.9rem', background: 'linear-gradient(315deg, #d5d9e8, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Why Businesses Choose StudentVerse
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 620, margin: '0 auto' }}>
                A focused way to reach verified students with offers that are easy to understand, easy to redeem, and built around local discovery.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {WHY_CARDS.map((card, i) => {
                  return (
                <motion.div key={card.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="sv-surface-card"
                  style={{ '--accent': card.color, minHeight: 235, textAlign: 'center' }}>
                  <div style={{ width: 34, height: 3, borderRadius: 999, background: card.color, margin: '0 auto 1.1rem' }} />
                  <h4 className="sv-card-title" style={{ fontSize: '1.08rem' }}>{card.title}</h4>
                  <p className="sv-card-copy" style={{ fontSize: '0.92rem' }}>{card.body}</p>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      <style>{`
        /* Pricing cards — Neo Brutalism style (dark blue) */
        .sv-pricing-card {
          width: 240px;
          background: transparent;
          padding: 1.25rem;
          border-radius: 1rem;
          border: 0.5vmin solid rgba(255,255,255,0.15);
          box-shadow: 0.4rem 0.4rem rgba(41,98,255,0.4);
          overflow: hidden;
          color: white;
        }
        .sv-pricing-card--featured {
          border-color: #664eff;
          box-shadow: 0.4rem 0.4rem #664eff;
          background: transparent;
        }
        .sv-pricing-header-card {
          width: auto;
          min-width: 240px;
          max-width: 520px;
          text-align: center;
          box-shadow: none;
          border-color: rgba(255,255,255,0.12);
          padding: 1.5rem 2.5rem;
          background: transparent;
        }
        .pricing-block-content {
          display: flex;
          height: 100%;
          flex-direction: column;
          gap: 0.5rem;
        }
        .pricing-plan {
          color: rgba(255,255,255,0.6);
          font-size: 0.7rem;
          line-height: 1;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
        }
        .price-value {
          display: flex;
          align-items: baseline;
          gap: 4px;
          color: #ffffff;
          line-height: 1;
        }
        .price-number {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .price-integer {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .price-period {
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          align-self: flex-end;
          padding-bottom: 2px;
        }
        .pricing-note {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.02em;
          margin-bottom: 0.25rem;
        }
        .check-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 1rem;
          padding: 0;
          list-style: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1rem;
        }
        .check-list-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          line-height: 1.4;
          letter-spacing: 0.01em;
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #0d1117; }
      `}</style>
    </div>
  );
}
