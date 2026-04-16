import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./Navbar";
import MainFooter from "../components/Footer";
import Footer from "./Footer";
import LogoLoop from "../components/LogoLoop";

const C = {
  blue:   "#2962ff",
  violet: "#7b2cbf",
  cyan:   "#00f0ff",
  orange: "#ff9800",
  pink:   "#e040fb",
};

function HeroSection() {
  return (
    <section style={{
      position:"relative", display:"flex", alignItems:"center",
      overflow:"hidden",
      padding:"clamp(5rem,12vh,9rem) clamp(1.5rem,5vw,4rem) clamp(5rem,10vh,8rem)"
    }}>
      <div style={{ maxWidth:1400, width:"100%", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(2rem,5vw,5rem)", alignItems:"center" }} className="about-hero-grid">

        {/* LEFT — text */}
        <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:.9, ease:[0.25,0.46,0.45,0.94], delay:.1 }} style={{ paddingLeft:"clamp(1rem,4vw,4rem)" }}>
          <h1 style={{ fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:900, lineHeight:0.92, marginBottom:"clamp(1.5rem,3vw,2.5rem)", letterSpacing:"-0.04em", textAlign:"left" }}>
            <span style={{ display:"block", background:"linear-gradient(315deg,#999,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>About</span>
            <span style={{ display:"block", background:"linear-gradient(315deg,#777,#ddd)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>StudentVerse</span>
          </h1>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.7, delay:.3 }}
            style={{ fontSize:"clamp(1rem,2vw,1.15rem)", color:"rgba(255,255,255,.6)", lineHeight:1.8, maxWidth:480, textAlign:"left" }}>
            Students spend more than they should, not because they are careless, but because the discounts that exist for them are scattered, hard to find, and even harder to use. StudentVerse fixes that.
          </motion.p>
        </motion.div>

{/* RIGHT — Interactive Galaxy Cards */}
<motion.div 
  initial={{ opacity:0, x:40 }} 
  animate={{ opacity:1, x:0 }} 
  transition={{ duration:.9, ease:[0.25,0.46,0.45,0.94], delay:.3 }}
  style={{ 
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center", 
    position:"relative", 
    height: 600, 
    width: "100%",
    maxWidth: 950,
    margin: "0 auto"
  }}
  className="about-cards-container"
>
  {/* Card 1 — Flash & Verify (Security Focus) */}
  <div style={{
    position: "absolute", 
    left: "2%", 
    top: "8%", 
    width: 290, 
    minHeight: 460,
    background: `
      radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
      repeating-radial-gradient(rgba(255, 255, 255, 0.12) 0px, transparent 1px, transparent 38px),
      repeating-radial-gradient(rgba(255, 180, 50, 0.08) 0px, transparent 1px, transparent 62px),
      #05020a
    `,
    backgroundSize: "100% 100%, 38px 38px, 62px 62px, 100% 100%",
    border: "1px solid rgba(236, 72, 153, 0.3)",
    borderRadius: 32, 
    transform: "rotate(-7deg)", 
    padding: 32, 
    display: "flex", 
    flexDirection: "column",
    boxShadow: "0 0 50px -15px rgba(236, 72, 153, 0.25)",
    zIndex: 2,
  }} className="about-card-1">
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EC4899", boxShadow: "0 0 12px #EC4899" }} />
        <span style={{ color: "#EC4899", fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.5 }}>Verify. Discover. Redeem.</span>
      </div>
      <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, margin: "0 0 10px 0", letterSpacing: "-0.04em" }}>Flash & Verify</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.5 }}>
        Instant verification secured at the system level with Flash & Verify, making every redemption fast and reliable.

      </p>
    </div>

    {/* BOTTOM: Verified Terminal */}
    <div style={{ 
      marginTop: 20, 
      background: "rgba(236, 72, 153, 0.05)", 
      borderRadius: 20, 
      padding: "16px", 
      border: "1px solid rgba(236, 72, 153, 0.2)",
      display: "flex",
      alignItems: "center",
      gap: 12
    }}>
      <div style={{ 
        width: 32, height: 32, borderRadius: "50%", 
        background: "rgba(236, 72, 153, 0.1)", 
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(236, 72, 153, 0.3)"
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div>
        <div style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 800 }}>IDENTITY VERIFIED</div>
        <div style={{ color: "rgba(236, 72, 153, 0.6)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: 0.5 }}>SECURE ENCLAVE ACTIVE</div>
      </div>
    </div>
  </div>

  {/* Card 2 — SV Orbit (Command/Chat Focus) */}
  <div style={{
    position: "absolute", 
    right: "2%", 
    bottom: "8%", 
    width: 300, 
    minHeight: 460,
    background: `
      radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
      repeating-radial-gradient(rgba(255, 255, 255, 0.12) 0px, transparent 1px, transparent 32px),
      repeating-radial-gradient(rgba(255, 140, 0, 0.08) 0px, transparent 1px, transparent 55px),
      #02040a
    `,
    backgroundSize: "100% 100%, 32px 32px, 55px 55px, 100% 100%",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: 32, 
    transform: "rotate(5deg)", 
    padding: 32, 
    display: "flex", 
    flexDirection: "column",
    boxShadow: "0 0 60px -15px rgba(59, 130, 246, 0.3)",
    zIndex: 3,
  }} className="about-card-2">
    <div style={{ flex: 1 }}>
      <div style={{ position: "relative", width: 28, height: 28, marginBottom: 20 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid #3B82F6", boxShadow: "0 0 10px #3B82F6" }} />
      </div>
      <h2 style={{ color: "#fff", fontSize: "1.9rem", fontWeight: 800, margin: "0 0 12px 0", letterSpacing: "-0.04em" }}>SV Orbit AI</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>
       SV Orbit, your AI-powered assistant to help you find the best deals effortlessly.

      </p>
    </div>

    {/* BOTTOM: Quick Chat Box */}
    <div style={{ marginTop: 20 }}>
      <div style={{ 
        background: "rgba(0,0,0,0.4)", 
        borderRadius: 16, 
        border: "1px solid rgba(59, 130, 246, 0.2)",
        padding: "4px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
      }}>
        <span style={{ color: "#3B82F6", fontWeight: 900, fontSize: "0.8rem" }}>&gt;</span>
        <input 
          type="text" 
          placeholder="Chat & Save Money..." 
          style={{ 
            background: "none", 
            border: "none", 
            color: "#fff", 
            fontSize: "0.8rem", 
            padding: "10px 0",
            width: "100%",
            outline: "none",
            fontFamily: "monospace"
          }} 
        />
        <div style={{ width: 6, height: 12, background: "#3B82F6", opacity: 0.6 }}></div> {/* Cursor effect */}
      </div>
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.55rem", marginTop: 8, textAlign: "center", letterSpacing: 1 }}>
        PRESS ENTER TO BEGIN
      </div>
    </div>
  </div>
</motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; }
          .about-cards-container {
            position: relative !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 40px !important;
            padding: 20px 0 !important;
          }
          .about-card-1 {
            position: static !important;
            width: 100% !important;
            max-width: 290px !important;
            margin: 0 auto !important;
          }
          .about-card-2 {
            position: static !important;
            width: 100% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}

function HowItStartedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  const timeline = [
    { year:"Nov", label:"The idea took shape. What started as a simple observation quickly turned into a plan, and a team was formed to begin building StudentVerse.", color: C.cyan },
    { year:"Jan", label:"The first public step. A waitlist was launched, and development began on the first real version of the app.", color: C.orange },
    { year:"Apr", label:"StudentVerse officially launched with a new website and app. Early partnerships were secured with 10+ brands, and the platform began expanding across 8+ universities in the UAE.", color: C.violet },
  ];

  return (
    <section id="how-it-started" ref={ref} style={{ position:"relative", padding:"60px 20px 120px", overflow:"hidden" }}>
      <div style={{ position:"relative", zIndex:1, maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }} className="about-origin-grid">
        <motion.div initial={{ opacity:0, x:-40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:.8 }}>
          <h2 style={{ fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:900, lineHeight:0.92, marginBottom:"1.5rem", letterSpacing:"-0.04em", textAlign:"left", background:"linear-gradient(315deg,#999,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            How StudentVerse Started
          </h2>
          <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,.6)", lineHeight:1.85, marginBottom:"2rem" }}>
            One student noticed something strange. While student discounts were common in many countries, they were almost nonexistent in Dubai. Deals existed, but they were scattered, hard to find, and often discovered too late.
            So instead of waiting for someone else to solve it, he decided to build it himself.
          </p>
          {timeline.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-20 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:.5, delay:.3 + i*.15 }}
              style={{ display:"flex", gap:"1rem", alignItems:"flex-start", marginBottom:"1.2rem" }}
            >
              <div style={{
                minWidth:48, height:48, borderRadius:"50%",
                border:"1px solid " + t.color,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:".7rem", fontWeight:700, color:t.color, letterSpacing:"1px",
              }}>{t.year}</div>
              <p style={{ color:"rgba(255,255,255,.7)", fontSize:".95rem", lineHeight:1.6, paddingTop:".7rem" }}>{t.label}</p>
            </motion.div>
          ))}
        </motion.div>



        <motion.div initial={{ opacity:0, x:40 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:.8, delay:.2 }} style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5rem", paddingTop:"3rem" }}>
          <img
            src="/assets/cute sanjy.jpeg"
            alt="Sanjar Ghazanfar"
            style={{ width:"100%", maxWidth:"420px", borderRadius:"20px", objectFit:"cover", display:"block" }}
          />
          <div style={{ margin:0, maxWidth:"420px", textAlign:"center", borderLeft:"none", paddingLeft:0 }}>
            <p style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.75)", lineHeight:1.8, fontStyle:"italic", fontFamily:"Georgia, serif", margin:"0 0 0.75rem" }}>
              "As a student myself, I could never find the discounts I was entitled to. The deals existed — they were just scattered and inaccessible. So I decided to change that."
            </p>
            <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.85rem", letterSpacing:"1px", textTransform:"uppercase" }}>Sanjar Ghazanfar, Founder</span>
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-origin-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

/*
  TEAM NAMES:
  Sanjar Ghazanfar, Mohamed Elkhouly, Sara Carla Kader,
  Mohammed Ayaan Khan, Muhammad Finan, Muhammad Moiz,
  Hadi Wehbe, Sanmeet Singh Kohli, Dwayne Dcruz, Luqman Ghazanfar
*/
const TEAM_ITEMS = [
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Sanjar Ghazanfar</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Mohamed Elkhouly</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Sara Carla Kader</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Mohammed Ayaan Khan</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Muhammad Finan</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Muhammad Moiz</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Hadi Wehbe</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Arshia Najafi</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Arina Mashkova</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Suwathi Rajasekar</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Mohamed Amin</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Dwayne Dcruz</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Arina Zhutaeva</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap" }}>Khadija El Janati</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Luqman Ghazanfar</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Aman Sivad</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Aryan Narayanan</span> },
  { node: <span style={{ fontSize:"1rem", fontWeight:400, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>Summer Rex</span> },
];
const TEAM_ITEMS_R = [...TEAM_ITEMS].reverse();

function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <section ref={ref} style={{ position:"relative", padding:"120px 0", overflow:"hidden" }}>
      <motion.div
        initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:.7 }}
        style={{ textAlign:"center", marginBottom:"3.5rem", padding:"0 20px" }}
      >
        <h2 style={{ fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.04em", background:"linear-gradient(315deg,#999,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Contributors</h2>
      </motion.div>
      <LogoLoop logos={TEAM_ITEMS} speed={60} direction="left" logoHeight={28} gap={48} hoverSpeed={15} fadeOut ariaLabel="Team members" />
      <div style={{ marginTop:"1.5rem" }}>
        <LogoLoop logos={TEAM_ITEMS_R} speed={60} direction="right" logoHeight={28} gap={48} hoverSpeed={15} fadeOut ariaLabel="Team members row 2" />
      </div>
    </section>
  );
}

const FAQ_COLORS = [C.cyan, C.orange, C.violet, C.blue];
const FAQS = [
  { q:"What is StudentVerse?",            a:"StudentVerse is a platform designed to connect students with exclusive deals, opportunities, and a seamless student experience." },
  { q:"Who can join StudentVerse?",       a:"Only verified university students can access the app, ensuring a trusted space to explore exclusive opportunities, deals, and student-focused experiences." },
  { q:"Is StudentVerse free to use?",     a:"Yes, the platform is designed to be accessible for all University students." },
  { q:"Can I contribute to StudentVerse?",a:"Yes, students can participate as contributors or interns helping build the platform." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="faq-about" ref={ref} style={{ position:"relative", padding:"120px 20px", overflow:"hidden" }}>
      <div style={{ position:"relative", zIndex:1, maxWidth:800, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:.7 }} style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <h2 style={{ fontSize:"clamp(3.5rem,9vw,7rem)", fontWeight:900, lineHeight:0.92, letterSpacing:"-0.04em", background:"linear-gradient(315deg,#999,#fff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Frequently Asked Questions</h2>
        </motion.div>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {FAQS.map((faq, i) => {
            const color = FAQ_COLORS[i % FAQ_COLORS.length];
            return (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:.5, delay:i*.1 }}
                style={{ background:"rgba(0,0,0,0.85)", border:"1px solid " + (open===i ? color+"70" : "rgba(255,255,255,.08)"), borderRadius:16, overflow:"hidden", boxShadow:open===i ? "0 0 30px " + color + "25" : "none", backdropFilter:"blur(20px)", transition:"border-color .3s, box-shadow .3s", position:"relative" }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:"radial-gradient(circle at 50% 0%, " + color + "18 0%, transparent 50%)", opacity:open===i ? 1 : 0.4, transition:"opacity .3s ease", pointerEvents:"none", borderRadius:16 }} />
                <button onClick={() => setOpen(open===i ? null : i)}
                  style={{ width:"100%", background:"none", border:"none", padding:"1.4rem 1.75rem", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", position:"relative" }}>
                  <motion.span animate={{ color:open===i ? color : "#fff" }} transition={{ duration:.3 }} style={{ fontWeight:600, fontSize:"1.05rem", textAlign:"left" }}>{faq.q}</motion.span>
                  <motion.span animate={{ rotate:open===i ? 45 : 0, scale:open===i ? 1.1 : 1 }} transition={{ duration:.3, ease:"easeInOut" }}
                    style={{ flexShrink:0, width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,.05)", border:"1px solid " + color + "40", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                </button>
                <motion.div initial={false} animate={{ height:open===i ? "auto" : 0, opacity:open===i ? 1 : 0 }}
                  transition={{ duration:.4, ease:[.25,.46,.45,.94], opacity:{ duration:open===i ? .3 : .2, delay:open===i ? .1 : 0 } }}
                  style={{ overflow:"hidden", position:"relative" }}>
                  <p style={{ padding:"0 1.75rem 1.4rem", color:"rgba(255,255,255,.8)", fontSize:".98rem", lineHeight:1.75 }}>{faq.a}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div style={{ minHeight:"100vh" }}>
      <Navbar />
      <HeroSection />
      {/* <HowItStartedSection /> */}
      <TeamSection />
      <FAQSection />
      <MainFooter />
      <Footer />
    </div>
  );
}
