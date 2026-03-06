import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { DEVELOPER } from '../../data/portfolio'

export function HeroHeader() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const isOverview = activeSection === 'overview'

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
              className="text-3xl md:text-4xl font-bold text-white"
              style={{
                textShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)'
              }}
            >
              {DEVELOPER.name}
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
