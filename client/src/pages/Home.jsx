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
      <Trustbar />
      <CTA />
      <MainFooter />
      <Footer />
      {/* Keep the original HTML for any remaining content */}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} style={{ display: 'none' }} />
    </>
  )
}
