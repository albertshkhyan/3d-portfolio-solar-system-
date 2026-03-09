import { useEffect, useCallback } from 'react'
import { useAppStore } from '../store'
import type { SectionId } from '../types'

const SECTION_KEYS: Record<string, SectionId> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'projects',
  '5': 'architecture',
  '6': 'devops',
  '7': 'contact',
}

const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  about: 'About Me',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  architecture: 'Architecture',
  devops: 'DevOps',
  contact: 'Contact',
}

export function useKeyboardNavigation() {
  const { goBack, setActiveSection, activeSection, activeProject, isTransitioning } = useAppStore()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTransitioning) return

      const target = event.target as HTMLElement
      const isInputFocused = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable

      if (isInputFocused) return

      if (event.key === 'Escape') {
        event.preventDefault()
        goBack()
        return
      }

      if (activeProject) return

      const section = SECTION_KEYS[event.key]
      if (section && activeSection !== section) {
        event.preventDefault()
        setActiveSection(section)
      }

      if (event.key === '0' || event.key === 'Home') {
        event.preventDefault()
        if (activeSection !== 'overview') {
          goBack()
        }
      }
    },
    [goBack, setActiveSection, activeSection, activeProject, isTransitioning]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { SECTION_KEYS, SECTION_LABELS }
}
