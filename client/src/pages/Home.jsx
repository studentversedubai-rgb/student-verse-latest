import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Trustbar from '../components/sections/Trustbar'
import DownloadCTA from '../components/sections/DownloadCTA'
import MainFooter from '../components/layout/Footer'
import PartnerBanner from '../components/layout/PartnerBanner'
import { useLenisScroll } from '../hooks/useLenisScroll'
import News from '../components/sections/News'

export default function Home() {
  // Initialize Lenis smooth scroll
  useLenisScroll()

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <News />
      <Trustbar />
      <DownloadCTA />
      <MainFooter />
      <PartnerBanner />
    </>
  )
}
