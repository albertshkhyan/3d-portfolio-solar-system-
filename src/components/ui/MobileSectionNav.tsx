import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAppStore, SECTIONS_ORDER } from '../../store'
import { PLANETS } from '../../data/portfolio'
import type { SectionId } from '../../types'

const SWIPE = {
  minDistance: 50,
  maxVertical: 60,
  maxDurationMs: 400,
} as const

const PLANET_COLORS: Record<SectionId, string> = {
  overview: '#fbbf24',
  about: '#9ca3af',
  skills: '#eab308',
  experience: '#3b82f6',
  projects: '#ef4444',
  architecture: '#f97316',
  devops: '#a78bfa',
  contact: '#6366f1',
}

const NAV_ITEM = {
  size: 44,
  gap: 16,
  activeScale: 1.08,
} as const

export function MobileSectionNav() {
  const activeSection = useAppStore((state) => state.activeSection)
  const setActiveSection = useAppStore((state) => state.setActiveSection)
  const isTransitioning = useAppStore((state) => state.isTransitioning)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null)

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const t = e.targetTouches[0]
      if (t) touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() }
    },
    []
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current
      touchStart.current = null
      if (!start || isTransitioning) return
      const t = e.changedTouches[0]
      if (!t) return
      const deltaX = t.clientX - start.x
      const deltaY = t.clientY - start.y
      const duration = Date.now() - start.t
      if (
        Math.abs(deltaY) > SWIPE.maxVertical ||
        duration > SWIPE.maxDurationMs ||
        Math.abs(deltaX) < SWIPE.minDistance
      )
        return
      const effectiveIndex = SECTIONS_ORDER.indexOf(activeSection)
      if (deltaX < -SWIPE.minDistance) {
        const next = effectiveIndex < SECTIONS_ORDER.length - 1 ? SECTIONS_ORDER[effectiveIndex + 1] : null
        if (next) setActiveSection(next)
      } else if (deltaX > SWIPE.minDistance) {
        if (effectiveIndex <= 0) setActiveSection('overview')
        else setActiveSection(SECTIONS_ORDER[effectiveIndex - 1])
      }
    },
    [activeSection, isTransitioning, setActiveSection]
  )

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 safe-area-inset-bottom"
      aria-label="Section navigation"
    >
      <div className="bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <div className="px-5 pt-5 pb-4">
          {/* Active section label */}
          <p className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-4 min-h-[14px]">
            {PLANETS.find((p) => p.id === activeSection)?.label ?? 'Overview'}
          </p>

          <div
            className="flex gap-4 justify-center overflow-x-auto overflow-y-hidden items-end scrollbar-none touch-pan-x"
            style={{ minHeight: NAV_ITEM.size + 28, paddingBottom: 4 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Swipe left or right to change section"
          >
            {PLANETS.map((planet) => {
              const isActive = activeSection === planet.id
              const color = PLANET_COLORS[planet.id] ?? planet.color
              const textureUrl = planet.texture
              const hasImage = Boolean(textureUrl)
              const shortLabel = planet.label.split(' ')[0]

              return (
                <motion.button
                  key={planet.id}
                  type="button"
                  onClick={() => !isTransitioning && setActiveSection(planet.id)}
                  disabled={isTransitioning}
                  aria-label={`Go to ${planet.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                  className="flex flex-col items-center gap-2 flex-shrink-0 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-2xl disabled:opacity-50 disabled:pointer-events-none"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? NAV_ITEM.activeScale : 1,
                      boxShadow: isActive
                        ? `0 0 0 2px rgba(168, 85, 247, 0.5), 0 0 20px 2px ${color}60`
                        : '0 0 0 2px transparent',
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{
                      width: NAV_ITEM.size,
                      height: NAV_ITEM.size,
                      backgroundColor: color,
                    }}
                  >
                    {hasImage ? (
                      <>
                        <img
                          src={textureUrl}
                          alt=""
                          role="presentation"
                          className="absolute inset-0 w-full h-full object-cover"
                          onLoad={() =>
                            setLoaded((prev) => ({ ...prev, [planet.id]: true }))
                          }
                        />
                        {!loaded[planet.id] && (
                          <span
                            className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white"
                            style={{ backgroundColor: color }}
                          >
                            {planet.label.charAt(0)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        {shortLabel}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium max-w-[56px] truncate transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-500'
                    }`}
                  >
                    {shortLabel}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
