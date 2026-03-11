import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store'
import { DEVELOPER } from '../../data/portfolio'

/** Gradient with a bright band for shimmer; use background-size 200% and animate position 0→100% */
const NAME_GRADIENT =
  'linear-gradient(90deg, #a78bfa 0%, #c084fc 25%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.5) 45%, #38bdf8 65%, #22d3ee 100%)'

export function HeroHeader() {
  const activeSection = useAppStore((state) => state.activeSection)
  const isOverview = activeSection === 'overview'

  const [firstName, ...surnameParts] = DEVELOPER.name.split(' ')
  const surname = surnameParts.join(' ')

  return (
    <AnimatePresence>
      {isOverview && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-8 left-8 z-40 max-w-md"
        >
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold hero-name-gradient"
              style={{
                backgroundImage: NAME_GRADIENT,
                backgroundSize: '200% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.35)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.15))',
              }}
            >
              <span>{firstName}</span>
              {surname && <span> {surname}</span>}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-purple-400 font-medium"
            >
              {DEVELOPER.title}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-zinc-400 leading-relaxed"
            >
              {DEVELOPER.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-px w-24 bg-gradient-to-r from-purple-500 to-transparent origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
