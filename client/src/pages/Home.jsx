import React, { useEffect, useState, useRef } from 'react'
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
import ScrollBaseAnimation from '../components/scroll-text-marque'

export default function Home() {
  const [html, setHtml] = useState('')

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
      <div className='h-[80px] sm:h-[400px] md:h-[500px] grid place-content-center'>
        <ScrollBaseAnimation
          // delay={500}
          baseVelocity={3}
          scrollDependent={true}
          clasname='font-bold tracking-[-0.07em] leading-[90%] bg-gradient-to-r from-[#00b8cc] via-[#cc8800] to-[#9a1f5a] bg-clip-text text-transparent'
        >
          VERIFY. DISCOVER. REDEEM.
        </ScrollBaseAnimation>
      </div>

      <Trustbar />
      <CTA />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  )
}
