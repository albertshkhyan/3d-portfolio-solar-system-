import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map as MapIcon, X } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { usePlanetPositions } from '../../store/usePlanetPositions'
import { PLANETS } from '../../data/portfolio'
import type { SectionId } from '../../types'

const MAP_SIZE = 160
const MAX_DISTANCE = 24
const SCALE = MAP_SIZE / (MAX_DISTANCE * 2)

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

export function MiniMap() {
  const [isOpen, setIsOpen] = useState(true)
  const [positions, setPositions] = useState<Map<SectionId, { x: number; z: number }>>(new Map())
  const { activeSection, setActiveSection } = usePortfolioStore()

  useEffect(() => {
    const interval = setInterval(() => {
      const newPositions = new Map<SectionId, { x: number; z: number }>()
      PLANETS.forEach((planet) => {
        const pos = usePlanetPositions.getState().getPosition(planet.id)
        if (pos) {
          newPositions.set(planet.id, { x: pos.x, z: pos.z })
        } else {
          const x = Math.cos(planet.initialAngle) * planet.distance
          const z = Math.sin(planet.initialAngle) * planet.distance
          newPositions.set(planet.id, { x, z })
        }
      })
      setPositions(newPositions)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handlePlanetClick = (id: SectionId) => {
    if (id !== activeSection) {
      setActiveSection(id)
    }
  }

  const handleOverviewClick = () => {
    if (activeSection !== 'overview') {
      setActiveSection('overview')
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative"
          >
            <div className="glass-panel p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-medium text-white/70">Solar Map</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close mini map"
                >
                  <X size={14} className="text-white/50" />
                </button>
              </div>

              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  width: MAP_SIZE,
                  height: MAP_SIZE,
                  background: 'radial-gradient(circle at center, rgba(30, 20, 50, 0.8) 0%, rgba(10, 5, 20, 0.95) 100%)',
                }}
              >
                {PLANETS.map((planet) => {
                  const orbitRadius = planet.distance * SCALE
                  return (
                    <div
                      key={`orbit-${planet.id}`}
                      className="absolute rounded-full border border-white/5"
                      style={{
                        width: orbitRadius * 2,
                        height: orbitRadius * 2,
                        left: MAP_SIZE / 2 - orbitRadius,
                        top: MAP_SIZE / 2 - orbitRadius,
                      }}
                    />
                  )
                })}

                <button
                  onClick={handleOverviewClick}
                  className="absolute rounded-full transition-all duration-200 hover:scale-125"
                  style={{
                    width: 10,
                    height: 10,
                    left: MAP_SIZE / 2 - 5,
                    top: MAP_SIZE / 2 - 5,
                    background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)',
                    boxShadow: activeSection === 'overview'
                      ? '0 0 12px 4px rgba(251, 191, 36, 0.6)'
                      : '0 0 8px 2px rgba(251, 191, 36, 0.4)',
                  }}
                  aria-label="Go to overview"
                />

                {PLANETS.map((planet) => {
                  const pos = positions.get(planet.id)
                  if (!pos) return null

                  const mapX = MAP_SIZE / 2 + pos.x * SCALE
                  const mapZ = MAP_SIZE / 2 + pos.z * SCALE
                  const isActive = activeSection === planet.id
                  const planetSize = Math.max(4, planet.size * 4)

                  return (
                    <motion.button
                      key={planet.id}
                      onClick={() => handlePlanetClick(planet.id)}
                      className="absolute rounded-full transition-shadow duration-200"
                      style={{
                        width: planetSize,
                        height: planetSize,
                        left: mapX - planetSize / 2,
                        top: mapZ - planetSize / 2,
                        background: PLANET_COLORS[planet.id],
                        boxShadow: isActive
                          ? `0 0 10px 3px ${PLANET_COLORS[planet.id]}80`
                          : 'none',
                      }}
                      whileHover={{ scale: 1.5 }}
                      aria-label={`Go to ${planet.label}`}
                    >
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${PLANET_COLORS[planet.id]}` }}
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                <div className="absolute bottom-1 left-1 right-1 flex items-center justify-center">
                  <span className="text-[8px] text-white/30 truncate">
                    {activeSection === 'overview'
                      ? 'Overview'
                      : PLANETS.find((p) => p.id === activeSection)?.label}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 px-1">
                {PLANETS.slice(0, 4).map((planet) => (
                  <button
                    key={planet.id}
                    onClick={() => handlePlanetClick(planet.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] transition-all ${
                      activeSection === planet.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: PLANET_COLORS[planet.id] }}
                    />
                    {planet.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="glass-panel p-3 rounded-2xl hover:bg-white/10 transition-colors group"
            aria-label="Open mini map"
          >
            <MapIcon size={20} className="text-white/70 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
