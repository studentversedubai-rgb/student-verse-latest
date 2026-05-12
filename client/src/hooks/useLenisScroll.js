import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export const useLenisScroll = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check if device is desktop (not mobile/tablet)
    const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window)
    
    if (!isDesktop) {
      return // Don't initialize Lenis on mobile/tablet
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Add Lenis class to html element
    document.documentElement.classList.add('lenis')

    lenisRef.current = lenis

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Handle resize to re-check desktop status
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window)
      if (!newIsDesktop) {
        lenis.destroy()
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [])

  return lenisRef.current
}