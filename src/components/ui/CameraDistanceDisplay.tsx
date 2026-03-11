import { motion } from 'framer-motion'
import { Sparkles, Home } from 'lucide-react'
import { useAppStore } from '../../store'
import { CAMERA } from '../../config/animation'

const THRESHOLD = CAMERA.MILKY_WAY_OVERLAY_THRESHOLD

export function CameraDistanceDisplay() {
  const cameraDistance = useAppStore((state) => state.cameraDistance)
  const activeSection = useAppStore((state) => state.activeSection)
  const isFreeCamera = useAppStore((state) => state.isFreeCamera)
  const setZoomIntent = useAppStore((state) => state.setZoomIntent)

  const inMilkyWayRange = cameraDistance >= THRESHOLD
  const canControlView = activeSection === 'overview' || isFreeCamera

  return (
    <div className="fixed top-8 right-8 z-40 flex items-center gap-2">
      <div
        className="px-3 py-2 rounded-xl glass-panel text-sm font-medium text-zinc-300 tabular-nums flex items-center gap-2"
        aria-live="polite"
        aria-label={`Camera distance: ${cameraDistance}`}
      >
        <span className="text-white/60 text-xs uppercase tracking-wider">
          Distance
        </span>
        {cameraDistance.toFixed(1)}
      </div>
      {canControlView && (
        <motion.button
          type="button"
          onClick={() => setZoomIntent(inMilkyWayRange ? 'reset' : 'milky-way')}
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel text-sm font-medium text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={inMilkyWayRange ? 'Back to solar system' : 'View Milky Way'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {inMilkyWayRange ? (
            <>
              <Home size={16} aria-hidden />
              <span className="hidden sm:inline">Solar system</span>
            </>
          ) : (
            <>
              <Sparkles size={16} aria-hidden />
              <span className="hidden sm:inline">Milky Way</span>
            </>
          )}
        </motion.button>
      )}
    </div>
  )
}
