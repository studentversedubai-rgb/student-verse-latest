import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrbitImages from './OrbitImages';
import styled from 'styled-components';
import { Cpu, Tag, ShieldCheck, Gift, Zap } from 'lucide-react';

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
  &::before {
    position: absolute; top: 0; left: -5em; right: 0; bottom: 0;
    margin: auto; content: ''; border-radius: 50%; display: block;
    width: 20em; height: 20em;
    transition: box-shadow 0.5s ease-out; z-index: -1;
  }
  &:hover { color: #fff; }
  &:hover::before { box-shadow: inset 0 0 0 10em ${p => p['data-color']}; }
  svg { flex-shrink: 0; }
`;

const DisabledStoreBtn = styled.a`
  background: transparent;
  position: relative;
  padding: 12px 24px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: default;
  pointer-events: none;
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  border: 1px solid #808080;
  color: #808080;
  &::before {
    position: absolute; top: 0; left: -5em; right: 0; bottom: 0;
    margin: auto; content: ''; border-radius: 50%; display: block;
    width: 20em; height: 20em;
    z-index: -1;
  }
  svg { flex-shrink: 0; }
`;

const ORBIT_ITEMS = [
  { label: 'SV Orbit',   icon: <Cpu size={16} color="#FFD700" fill="#FFD700" /> },
  { label: 'Discounts',  icon: <Tag size={16} color="#00f0ff" fill="#00f0ff" /> },
  { label: 'Verify ID',  icon: <ShieldCheck size={16} color="#34A853" fill="#34A853" /> },
  { label: 'Rewards',    icon: <Gift size={16} color="#ff9800" fill="#ff9800" /> },
  { label: 'Flash Deal', icon: <Zap size={16} color="#7b2cbf" fill="#7b2cbf" /> },
];

export default function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('heroAnimated');
    if (animated) { setHasAnimated(true); }
    else { sessionStorage.setItem('heroAnimated', 'true'); }
  }, []);

  return (
    <section style={{
      position: 'relative', display: 'flex', alignItems: 'center',
      overflow: 'hidden', backgroundColor: '#080C1F',
      padding: 'clamp(5rem,12vh,9rem) clamp(1.5rem,5vw,4rem) 4rem',
    }}>
      <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, pointerEvents:'none' }}>
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4" type="video/mp4" />
      </video>
      <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:1, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'180px', background:'linear-gradient(to bottom,transparent,#080C1F)', pointerEvents:'none', zIndex:2 }} />

      <div style={{ maxWidth:'1400px', width:'100%', margin:'0 auto', position:'relative', zIndex:3, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,5vw,5rem)', alignItems:'center' }} className="hero-grid">

        <motion.div initial={hasAnimated?{opacity:1,x:0}:{opacity:0,x:-40}} animate={{opacity:1,x:0}} transition={{duration:0.9,ease:[0.25,0.46,0.45,0.94],delay:0.2}}>
          <h1 style={{ fontSize:'clamp(2.8rem,7vw,6.5rem)', fontWeight:900, lineHeight:0.92, marginBottom:'clamp(2rem,3vw,3rem)', letterSpacing:'-0.04em', textAlign:'left', overflowWrap:'break-word', wordBreak:'break-word' }}>
            <motion.span initial={hasAnimated?{opacity:1}:{opacity:0}} animate={{opacity:1}} transition={{duration:0.8,delay:0.4}} style={{display:'block'}}>
              <span style={{ background:'linear-gradient(315deg,#999,#fff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>UNLOCK</span>
            </motion.span>
            <motion.span initial={hasAnimated?{opacity:1}:{opacity:0}} animate={{opacity:1}} transition={{duration:0.8,delay:0.5}} style={{display:'block'}}>
              <span style={{ background:'linear-gradient(315deg,#777,#ddd)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>STUDENT DISCOUNTS</span>
            </motion.span>
          </h1>
          <motion.p initial={hasAnimated?{opacity:1,y:0}:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.6}} style={{ fontSize:'clamp(1rem,2vw,1.2rem)', fontWeight:400, color:'rgba(255,255,255,0.65)', lineHeight:1.7, marginBottom:'clamp(1rem,2vw,1.5rem)', maxWidth:'550px', textAlign:'left' }}>
            Your universal student discount card. Verify once, save everywhere. Unlock exclusive deals at with partner brands across UAE.
          </motion.p>
          <motion.p initial={hasAnimated?{opacity:1,y:0}:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.7}} style={{ fontSize:'0.85rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'2.5px', marginBottom:'clamp(2rem,3vw,2.5rem)', textAlign:'left' }}>
            <span style={{color:'#007AFF'}}>Verify.</span>{' '}
            <span style={{color:'#ff9800'}}>Discover.</span>{' '}
            <span style={{color:'#7b2cbf'}}>Redeem.</span>
          </motion.p>
          <motion.div initial={hasAnimated?{opacity:1,y:0}:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.8}} style={{ display:'flex', gap:'clamp(0.75rem,2vw,1.25rem)', flexWrap:'wrap' }}>
            <StoreBtn href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" data-color="#007AFF">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.02.05-2.25.68-2.98 1.53-.65.76-1.17 1.97-1.02 3.1.01 0 1.13-.48 2.99-.48z"/>
              </svg>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', lineHeight:1.2 }}>
                <span style={{ fontSize:'0.65rem', opacity:0.75, fontWeight:400 }}>Get it now on</span>
                <span>App Store</span>
              </div>
            </StoreBtn>
            <DisabledStoreBtn>
              <svg width="22" height="22" viewBox="0 0 512 512" fill="currentColor">
                <path d="M70.667 499.429c-4.114 0-8.093-1.209-11.527-3.499L275.925 279.145l56.21 56.21L98.648 493.228c-8.404 4.131-18.59 6.201-27.981 6.201zM30.118 468.715c-2.731-5.042-4.118-10.731-4.118-16.572V59.857c0-5.731 1.34-11.31 3.97-16.279l196.452 196.452-196.304 228.685zM468.098 219.08l-53.913-30.913-61.938 61.938 61.938 61.938 54.569-31.267c15.496-8.88 24.765-25.077 24.765-42.848s-9.926-33.968-25.421-18.848zM59.14 16.07C62.574 13.78 66.553 12.571 70.667 12.571c9.391 0 19.577 2.07 27.981 6.201l233.787 157.873-56.21 56.21L59.14 16.07z"/>
              </svg>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', lineHeight:1.2 }}>
                <span style={{ fontSize:'0.65rem', opacity:0.75, fontWeight:400 }}>Coming Soon</span>
                <span>Google Play</span>
              </div>
            </DisabledStoreBtn>
          </motion.div>
        </motion.div>

        <motion.div initial={hasAnimated?{opacity:1,x:0}:{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.9,ease:[0.25,0.46,0.45,0.94],delay:0.4}} style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'relative', width:'520px', height:'520px' }}>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:10, pointerEvents:'none' }}>
              <img src="/assets/phones.png" alt="" aria-hidden="true" style={{ width:'52%', height:'auto', objectFit:'contain', display:'block' }} />
            </div>
            <div style={{ position:'absolute', inset:0, zIndex:20 }}>
              <OrbitImages shape="ellipse" radiusX={240} radiusY={160} baseWidth={600} itemSize={130} duration={30} rotation={0} responsive={true} width={520} height={520}>
                {ORBIT_ITEMS.map(f => (
                  <div key={f.label} style={{ display:'flex', alignItems:'center', gap:'6px', color:'#fff', fontSize:'0.75rem', fontWeight:600, whiteSpace:'nowrap', letterSpacing:'0.3px' }}>
                    {f.icon}<span>{f.label}</span>
                  </div>
                ))}
              </OrbitImages>
            </div>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:30, pointerEvents:'none' }}>
              <img src="/assets/phones.png" alt="App" style={{ width:'52%', height:'auto', objectFit:'contain', display:'block', WebkitMaskImage:'linear-gradient(to bottom,black 45%,transparent 65%)', maskImage:'linear-gradient(to bottom,black 45%,transparent 65%)' }} />
            </div>
          </div>
        </motion.div>

      </div>
      <style>{`@media(max-width:900px){
        .hero-grid{grid-template-columns:1fr!important; gap: clamp(1rem,3vw,2rem) !important;}
        .hero-grid>div:first-child h1{font-size: clamp(2.2rem,6vw,3.2rem) !important; margin-bottom: clamp(1rem,2vw,1.5rem) !important;}
        .hero-grid>div:first-child p{font-size: clamp(0.95rem,2.2vw,1.1rem) !important; margin-bottom: clamp(0.75rem,1.5vw,1rem) !important;}
        .hero-grid>div:first-child div:last-child{gap: clamp(0.5rem,1.5vw,0.75rem) !important;}
        .hero-grid>div:last-child{display:flex !important; width: 100% !important; max-width: 450px !important; margin: 0 auto !important;}
        .hero-grid>div:last-child>div{width: 350px !important; height: 350px !important;}
        .hero-grid>div:last-child img{width: 50% !important;}
      }`}</style>
    </section>
  );
}