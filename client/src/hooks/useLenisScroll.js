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

    // Snap to ghost cursor section functionality
    const ghostSection = document.querySelector('#ghost-section')
    let isSnapping = false
    
    if (ghostSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When section is partially visible and user is scrolling towards it, snap to it
            if (entry.intersectionRatio > 0.2 && entry.intersectionRatio < 0.8 && !isSnapping) {
              isSnapping = true
              
              const rect = entry.target.getBoundingClientRect()
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop
              const targetTop = rect.top + scrollTop
              
              // Smooth scroll to the section
              lenis.scrollTo(targetTop, {
                duration: 1.0,
                easing: (t) => 1 - Math.pow(1 - t, 3),
                onComplete: () => {
                  isSnapping = false
                }
              })
            }
          })
        },
        {
          threshold: [0.2, 0.5, 0.8],
          rootMargin: '-5% 0px -5% 0px'
        }
      )

      observer.observe(ghostSection)

      // Handle resize to re-check desktop status
      const handleResize = () => {
        const newIsDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window)
        if (!newIsDesktop) {
          lenis.destroy()
          observer.disconnect()
        }
      }

      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        observer.disconnect()
        window.removeEventListener('resize', handleResize)
        document.documentElement.classList.remove('lenis')
        lenis.destroy()
      }
    }

    // Cleanup Lenis
    return () => {
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [])

  return lenisRef.current
}