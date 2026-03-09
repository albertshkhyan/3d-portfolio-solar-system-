import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useViewport() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkViewport()
    queueMicrotask(() => setIsLoaded(true))

    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  return { isMobile, isLoaded }
}
