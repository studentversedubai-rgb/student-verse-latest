import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import MainFooter from '../components/Footer';
import Footer from './Footer';
import { CheckCircle } from 'lucide-react';
import SubmitButton from '../components/SubmitButton';

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', priority: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (window.location.hash === '#ticket-form') {
      setTimeout(() => {
        const el = document.getElementById('ticket-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.priority) e.priority = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPriority: ${form.priority}\nCategory: ${form.category}\n\n${form.message}`;
    window.location.href = `mailto:support@studentverse.ae?subject=Support Ticket [${form.category}] - ${form.priority} Priority&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const input = {
    width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const label = { display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' };
  const err = { color: '#ff6b6b', fontSize: '0.78rem', marginTop: '0.25rem' };

  return (
    <>
      <Navbar />
      <div style={{ padding: 'clamp(7rem,12vh,10rem) clamp(1.5rem,5vw,4rem) 2rem', maxWidth: '680px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, background: 'linear-gradient(315deg, #0055aa, #007AFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 0.75rem' }}>
            Support Center
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Having an issue? Submit a ticket and we'll get back to you.
          </p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '20px' }}>
              <CheckCircle size={56} color="#00f0ff" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ticket Submitted!</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                Our support team will reach out to you at <strong style={{ color: '#00f0ff' }}>{form.email}</strong> shortly.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', priority: '', category: '', message: '' }); }}
                style={{ marginTop: '1.5rem', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.9rem' }}>
                Submit another
              </button>
            </motion.div>
          ) : (
            <form id="ticket-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={label}>Your Name</label>
                <input style={input} type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" />
                {errors.name && <p style={err}>{errors.name}</p>}
              </div>
              <div>
                <label style={label}>Your Email</label>
                <input style={input} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />
                {errors.email && <p style={err}>{errors.email}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={label}>Priority</label>
                  <select style={{ ...input, cursor: 'pointer' }} value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                    <option value="" style={{ background: '#0d1117' }}>Select</option>
                    {['Low', 'Medium', 'High'].map(o => <option key={o} value={o} style={{ background: '#0d1117' }}>{o}</option>)}
                  </select>
                  {errors.priority && <p style={err}>{errors.priority}</p>}
                </div>
                <div>
                  <label style={label}>Category</label>
                  <select style={{ ...input, cursor: 'pointer' }} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                    <option value="" style={{ background: '#0d1117' }}>Select</option>
                    {['Account', 'Payments', 'Partnerships', 'App Bug', 'Other'].map(o => <option key={o} value={o} style={{ background: '#0d1117' }}>{o}</option>)}
                  </select>
                  {errors.category && <p style={err}>{errors.category}</p>}
                </div>
              </div>
              <div>
                <label style={label}>Describe your issue</label>
                <textarea style={{ ...input, resize: 'vertical', minHeight: '120px' }} rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us what's happening..." />
                {errors.message && <p style={err}>{errors.message}</p>}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <SubmitButton label="Submit" />
              </div>
            </form>
          )}


        </motion.div>
      </div>
      <MainFooter />
      <Footer />
    </>
  );
}
