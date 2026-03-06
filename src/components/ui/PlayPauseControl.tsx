import { motion } from 'framer-motion'
import { Play, Pause, Lock, Unlock } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'

export function PlayPauseControl() {
  const { isPaused, togglePause, isFreeCamera, toggleFreeCamera } = usePortfolioStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-panel px-5 py-3 rounded-full flex items-center gap-5">
        {/* Play/Pause Control */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={togglePause}
            className="relative w-10 h-10 rounded-full flex items-center justify-center
                       bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPaused ? 'Play animation' : 'Pause animation'}
          >
            <motion.div
              initial={false}
              animate={{ scale: isPaused ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
            {isPaused ? (
              <Play size={18} className="text-white ml-0.5" fill="white" />
            ) : (
              <Pause size={18} className="text-white" fill="white" />
            )}
            </motion.div>
            
            {!isPaused && (
              <motion.span
                className="absolute inset-0 rounded-full border border-white/30"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>

          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 uppercase tracking-wider">
              Orbit
            </span>
            <span className="text-xs text-white font-medium">
              {isPaused ? 'Paused' : 'Playing'}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-white/10" />

        {/* Camera Lock/Unlock Control */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleFreeCamera}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center
                       transition-colors ${
                         isFreeCamera 
                           ? 'bg-purple-500/30 hover:bg-purple-500/40' 
                           : 'bg-white/10 hover:bg-white/20'
                       }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isFreeCamera ? 'Lock camera' : 'Unlock camera for free movement'}
          >
            <motion.div
              initial={false}
              animate={{ 
                rotate: isFreeCamera ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {isFreeCamera ? (
                <Unlock size={18} className="text-purple-300" />
              ) : (
                <Lock size={18} className="text-white" />
              )}
            </motion.div>

            {isFreeCamera && (
              <motion.span
                className="absolute inset-0 rounded-full border border-purple-400/50"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </motion.button>

          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 uppercase tracking-wider">
              Camera
            </span>
            <span className="text-xs text-white font-medium">
              {isFreeCamera ? 'Free' : 'Locked'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
