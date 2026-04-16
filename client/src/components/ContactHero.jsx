import { useState } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl_v2 } from '../config/api';
import { GraduationCap, MapPin, Sparkles, Handshake, CheckCircle, Tag, Zap } from 'lucide-react';
import SubmitButton from './SubmitButton';

const underlineInput = {
  width: '100%',
  padding: '0.75rem 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 0,
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease',
};

const underlineLabel = {
  display: 'block',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '0.25rem',
  fontSize: '0.75rem',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const WHY_CARDS = [
  {
    title: 'Student Audience',
    body: 'Connect directly with university students looking for new places, deals, and experiences.',
    icon: <GraduationCap size={32} color="#00f0ff" fill="#00f0ff" />,
  },
  {
    title: 'More Foot Traffic',
    body: 'Bring more people through your door with targeted offers and local discovery.',
    icon: <MapPin size={32} color="#ff9800" />,
  },
  {
    title: 'Brand Visibility',
    body: 'Get featured listings, trending placements, and real exposure inside the app.',
    icon: <Sparkles size={32} color="#FFD700" fill="#FFD700" />,
  },
  {
    title: 'Easy Partnership',
    body: 'Simple onboarding, clear offers, and a smooth experience for you and your customers.',
    icon: <Handshake size={32} color="#2962ff" />,
  },
];

export default function ContactHero() {
  const [mode, setMode] = useState('business'); // 'business' | 'student'
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', businessType: '', location: '', subject: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Student form state
  const [studentData, setStudentData] = useState({ fullName:'', university:'', studentEmail:'', course:'', year:'', role:'', why:'' });
  const [studentSubmitted, setStudentSubmitted] = useState(false);
  const [studentSubmitting, setStudentSubmitting] = useState(false);
  const [studentError, setStudentError] = useState('');

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
          inquiryType: 'general',
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

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
    if (studentError) setStudentError('');
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setStudentSubmitting(true);
    setStudentError('');
    try {
      const response = await fetch(getApiUrl_v2('/api/contact/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: studentData.fullName,
          lastName: '',
          email: studentData.studentEmail,
          message: `University: ${studentData.university}\nCourse/Major: ${studentData.course}\nYear of Study: ${studentData.year}\nRole Applying For: ${studentData.role}\n\nWhy join StudentVerse:\n${studentData.why}`,
          inquiryType: 'student',
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit');
      setStudentSubmitted(true);
      setStudentData({ fullName:'', university:'', studentEmail:'', course:'', year:'', role:'', why:'' });
    } catch (err) {
      setStudentError(err.message || 'Failed to send. Please try again.');
    } finally {
      setStudentSubmitting(false);
    }
  };

  // Toggle pill
  const Toggle = (
    <div style={{ display:'flex', justifyContent:'center', padding:'2rem 0 0' }}>
      <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.06)', borderRadius:'999px', padding:'4px', border:'1px solid rgba(255,255,255,0.1)', position:'relative', gap:'2px' }}>
        {[
          { key: 'business', label: 'Business', color: '#ff9800' },
          { key: 'student', label: 'Student', color: '#9c27b0' }
        ].map(m => (
          <motion.button 
            key={m.key} 
            onClick={() => setMode(m.key)} 
            whileHover={{ x: 4 }}
            whileTap={{ x: -4, scale: 0.98 }}
            style={{
              position:'relative', zIndex:1, padding:'10px 32px', borderRadius:'999px', border:'none', cursor:'pointer', fontSize:'0.9rem', fontWeight:600, letterSpacing:'0.3px',
              background: mode === m.key ? m.color : 'transparent',
              color: mode === m.key ? '#fff' : 'rgba(255,255,255,0.5)',
              transition:'all 0.25s ease',
            }}>
            {m.label}
          </motion.button>
        ))}
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
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {Toggle}

      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(41,98,255,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '0%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(123,44,191,0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {mode === 'student' ? (
        /* â”€â”€ STUDENT MODE â”€â”€ */
        <div style={{ maxWidth:'800px', margin:'0 auto', padding:'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,3rem) 4rem', position:'relative', zIndex:1 }}>
          {studentSubmitted ? (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6 }} style={{ textAlign:'center', maxWidth:'480px', margin:'0 auto' }}>
              <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.5rem' }}>
                <CheckCircle size={64} color="#00f0ff" />
              </div>
              <h2 style={{ fontSize:'2.5rem', fontWeight:'800', color:'#fff', marginBottom:'1rem' }}>Application sent!</h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1.1rem', lineHeight:1.7, marginBottom:'2rem' }}>
                We'll be in touch at <strong style={{ color:'#00f0ff' }}>{studentData.studentEmail || 'your email'}</strong> soon.
              </p>
              <button onClick={() => setStudentSubmitted(false)} style={{ background:'none', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'0.75rem 2rem', borderRadius:'50px', fontSize:'0.95rem', cursor:'pointer' }}>
                Submit another
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
              <h1 style={{ fontSize:'clamp(2.5rem,6vw,4rem)', fontWeight:800, lineHeight:1.1, marginBottom:'1rem', textAlign:'center' }}>
                <span style={{ background:'linear-gradient(135deg,#7b2cbf,#9c27b0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Work With Us.</span>
              </h1>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'1.05rem', lineHeight:1.8, marginBottom:'2.5rem', textAlign:'center', maxWidth:'520px', margin:'0 auto 2.5rem' }}>
                We're always looking for driven students to join the StudentVerse team. Fill in the form and we'll be in touch.
              </p>
              <form onSubmit={handleStudentSubmit} style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }} className="student-grid">
                  <div>
                    <label style={underlineLabel}>Full Name</label>
                    <input type="text" name="fullName" value={studentData.fullName} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='fullName' ? '#7b2cbf' : 'rgba(255,255,255,0.2)' }} onFocus={()=>setFocusedField('fullName')} onBlur={()=>setFocusedField(null)} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={underlineLabel}>University / College</label>
                    <input type="text" name="university" value={studentData.university} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='university' ? '#7b2cbf' : 'rgba(255,255,255,0.2)' }} onFocus={()=>setFocusedField('university')} onBlur={()=>setFocusedField(null)} placeholder="Your institution" />
                  </div>
                </div>
                <div>
                  <label style={underlineLabel}>Your Email</label>
                  <input type="email" name="studentEmail" value={studentData.studentEmail} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='studentEmail' ? '#7b2cbf' : 'rgba(255,255,255,0.2)' }} onFocus={()=>setFocusedField('studentEmail')} onBlur={()=>setFocusedField(null)} placeholder="you@email.com" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }} className="student-grid">
                  <div>
                    <label style={underlineLabel}>Course / Major</label>
                    <input type="text" name="course" value={studentData.course} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='course' ? '#7b2cbf' : 'rgba(255,255,255,0.2)' }} onFocus={()=>setFocusedField('course')} onBlur={()=>setFocusedField(null)} placeholder="e.g. Computer Science" />
                  </div>
                  <div>
                    <label style={underlineLabel}>Year of Study</label>
                    <select name="year" value={studentData.year} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='year' ? '#7b2cbf' : 'rgba(255,255,255,0.2)', background:'transparent', appearance:'none', cursor:'pointer' }} onFocus={()=>setFocusedField('year')} onBlur={()=>setFocusedField(null)}>
                      <option value="" style={{ background:'#0d1117' }}>Select year</option>
                      {['1st Year','2nd Year','3rd Year','4th Year','Masters','PhD','Other'].map(y => (
                        <option key={y} value={y} style={{ background:'#0d1117' }}>{y}</option>
                        
                      ))}
                      
                    </select>
                  </div>
                </div>
                <div>
                  <label style={underlineLabel}>Role Applying For</label>
                  <select name="role" value={studentData.role} onChange={handleStudentChange} required style={{ ...underlineInput, borderBottomColor: focusedField==='role' ? '#7b2cbf' : 'rgba(255,255,255,0.2)', background:'transparent', appearance:'none', cursor:'pointer' }} onFocus={()=>setFocusedField('role')} onBlur={()=>setFocusedField(null)}>
                    <option value="" style={{ background:'#0d1117' }}>Select role</option>
                    {['Frontend Developer','Backend Developer', 'Graphic Designer','Content Creator', 'Other'].map(r => (
                      <option key={r} value={r} style={{ background:'#0d1117' }}>{r}</option>
                    ))}
                  </select>
                </div>
                <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(123,44,191,0.3)', borderRadius:'12px', padding:'1rem 1.25rem' }}>
                  <label style={{ ...underlineLabel, marginBottom:'0.5rem' }}>Why do you want to work with us?</label>
                  <textarea name="why" value={studentData.why} onChange={handleStudentChange} required rows={4} style={{ ...underlineInput, borderBottom:'none', padding:'0', resize:'none' }} onFocus={()=>setFocusedField('why')} onBlur={()=>setFocusedField(null)} placeholder="Tell us about yourself, your skills, and what you'd bring to the team..." />
                </div>
                {studentError && <p style={{ color:'#ff4444', fontSize:'0.9rem' }}>{studentError}</p>}
                <SubmitButton label={studentSubmitting ? 'Sending...' : 'Submit'} disabled={studentSubmitting} />
              </form>

            </motion.div>
          )}
        </div>
      ) : (
        /* â”€â”€ BUSINESS MODE â”€â”€ */
        <>

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 4vw, 3rem) 4rem',
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
            <span style={{ background: 'linear-gradient(315deg, #ff9800, #ffb74d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Want to partner</span><br />
            <span style={{ background: 'linear-gradient(315deg, #ff9800, #ffb74d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>with us?</span>
          </motion.h1>
          <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '420px' }}>
            Looking to get your brand in front of thousands of students? Fill out the form and we'll take it from there.
          </motion.p>
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Email', value: 'Careers@studentverse.ae' },
              { label: 'Based in', value: 'Dubai, UAE' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.25rem' }}>{label}</p>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT â€” form */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ paddingTop: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                  style={{ ...fieldStyle('businessType'), background: 'transparent', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', border: 'none', borderBottom: `1px solid ${focusedField === 'businessType' ? '#ff9800' : 'rgba(255,255,255,0.2)'}`, borderRadius: 0, cursor: 'pointer' }}>
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
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem', background: 'linear-gradient(315deg, #999, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Why Businesses Choose StudentVerse
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
            Everything you need to reach the student market, in one place.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {WHY_CARDS.map((card, i) => (
            <motion.div key={card.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: '0.5rem 0' }}>
              <div style={{ marginBottom: '1rem' }}>{card.icon}</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{card.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .student-grid { grid-template-columns: 1fr !important; }
          .student-perks-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #0d1117; }
      `}</style>
    </div>
  );
}
