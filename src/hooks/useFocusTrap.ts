import { useEffect, useRef, useCallback } from 'react'

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

interface UseFocusTrapOptions {
  isActive: boolean
  onEscape?: () => void
  restoreFocus?: boolean
}

export function useFocusTrap<T extends HTMLElement>({
  isActive,
  onEscape,
  restoreFocus = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<T>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    ).filter((el) => el.offsetParent !== null)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || !containerRef.current) return

      if (event.key === 'Escape' && onEscape) {
        event.preventDefault()
        event.stopPropagation()
        onEscape()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    },
    [isActive, onEscape, getFocusableElements]
  )

  useEffect(() => {
    if (isActive) {
      previousFocusRef.current = document.activeElement as HTMLElement

      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        requestAnimationFrame(() => {
          focusableElements[0].focus()
        })
      }

      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (restoreFocus && previousFocusRef.current && !isActive) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive, handleKeyDown, getFocusableElements, restoreFocus])

  return containerRef
}
