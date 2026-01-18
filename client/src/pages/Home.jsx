import { useEffect, useState, useRef } from 'react'
import { initPageInteractions } from '../utils/initInteractions'
import { normalizeHtml } from '../utils/normalizeHtml'
import Navbar from './Navbar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Features from '../components/Features'
import Trustbar from '../components/Trustbar'
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
      <TrustedBy />
      <Features />
   

      <Trustbar />
      
      {/* Ghost Cursor Section with Text */}
      <div id="ghost-section" className="ghost-cursor-section relative h-screen flex items-center justify-center mt-20">
        <GhostCursor
          // Visuals
          color="#00f0ff"
          brightness={1}
          edgeIntensity={0}

          // Trail and motion
          trailLength={50}
          inertia={0.5}

          // Post-processing
          grainIntensity={0.05}
          bloomStrength={0.2}
          bloomRadius={1.0}
          bloomThreshold={0.025}

          // Fade-out behavior
          fadeDelayMs={1000}
          fadeDurationMs={1500}
          
          className="absolute inset-0"
        />
        
        {/* Text Overlay */}
        <div className="relative z-20 text-center pointer-events-none px-4">
          <h2 className="ghost-text text-black font-bold opacity-90 tracking-wide">
            Unlock savings only
          </h2>
          <h2 className="ghost-text-highlight font-bold text-black opacity-90 tracking-wide mt-2">
            students know about
          </h2>
        </div>
      </div>
      
      <CTA />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  )
}
