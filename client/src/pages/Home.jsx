import { useEffect, useState, useRef } from 'react'
import { initPageInteractions } from '../utils/initInteractions'
import { normalizeHtml } from '../utils/normalizeHtml'
import Navbar from './Navbar'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Features from '../components/Features'
import Trustbar from '../components/Trustbar'
import Partners from '../components/Partners'
import Stats from '../components/Stats'
import DownloadCTA from '../components/DownloadCTA'
import PricingPlans from '../components/PricingPlans'
import CTA from '../components/CTA'
import MainFooter from '../components/Footer'
import Footer from './Footer'
import GhostCursor from '../components/GhostCursor'
import { useLenisScroll } from '../hooks/useLenisScroll'
import News from '../components/News'
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
      {/* <Partners /> */}
      <Features />
      <News />
      <Trustbar />
      {/* <Stats /> */}
      <DownloadCTA />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  )
}
