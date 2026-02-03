import { useEffect, useState, useRef } from 'react'
import { initPageInteractions } from '../utils/initInteractions'
import { normalizeHtml } from '../utils/normalizeHtml'
import Navbar from './Navbar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Features from '../components/Features'
import Trustbar from '../components/Trustbar'
import PricingPlans from '../components/PricingPlans'
import CTA from '../components/CTA'
import MainFooter from '../components/Footer'
import Footer from './Footer'
import GhostCursor from '../components/GhostCursor'
import { useLenisScroll } from '../hooks/useLenisScroll'
import '../styles/ghost-cursor.css'

export default function Home() {
  const [html, setHtml] = useState('')

  // Initialize Lenis smooth scroll
  useLenisScroll()

  useEffect(() => {
    fetch('/raw/home.html')
      .then((res) => res.text())
      .then((text) => setHtml(normalizeHtml(text)))
  }, [])

  const containerRef = useRef(null)

  useEffect(() => {
    if (!html) return
    const timer = setTimeout(() => {
      const root = containerRef.current || document
      initPageInteractions(root)
    }, 0)
    return () => clearTimeout(timer)
  }, [html])

  return (
    <>
      <Navbar />
      <Hero />
      {/* <TrustedBy /> */}
      <Features />
      <Trustbar />
      <PricingPlans />
      {/* Ghost Cursor Section with Text */}
      {/* <div id="ghost-section" className="ghost-cursor-section relative hidden lg:block " style={{
        height: '100vh',
        marginTop: '120px',
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <GhostCursor
          color="#00f0ff"
          brightness={0.5}
          edgeIntensity={0}

          trailLength={50}
          inertia={0.5}

          grainIntensity={0.05}
          bloomStrength={0.2}
          bloomRadius={1.0}
          bloomThreshold={0.025}

          fadeDelayMs={1000}
          fadeDurationMs={1500}

          className="absolute inset-0"
        />

        <div className="relative z-20 pointer-events-none" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '800px'
        }}>
          <h2 className="ghost-text text-white font-bold opacity-90 tracking-wide" style={{
            margin: '0',
            lineHeight: '1.1'
          }}>
            Unlock savings only
          </h2>
          <h2 className="ghost-text-highlight font-bold text-white opacity-90 tracking-wide" style={{
            margin: '0.5rem 0 0 0',
            lineHeight: '1.1'
          }}>
            students know about
          </h2>
        </div>
      </div> */}

      <CTA />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  )
}
