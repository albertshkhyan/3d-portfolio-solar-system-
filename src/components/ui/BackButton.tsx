import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useAppStore } from '../../store'

const SECTION_LABELS: Record<string, string> = {
  about: 'About Me',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  architecture: 'Architecture',
  devops: 'DevOps',
  contact: 'Contact',
}

export function BackButton() {
  const { activeSection, goBack, isTransitioning } = useAppStore()

  const currentLabel = SECTION_LABELS[activeSection] || activeSection

  return (
    <AnimatePresence>
      {activeSection !== 'overview' && (
        <motion.button
          initial={{ x: -40, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -40, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={goBack}
          disabled={isTransitioning}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Go back from ${currentLabel} to overview. Press Escape as shortcut.`}
          aria-keyshortcuts="Escape"
          className="fixed top-8 left-8 z-50 
                     flex items-center gap-2 px-4 py-2.5 
                     glass-panel text-[14px] font-medium
                     text-zinc-300 hover:text-white
                     transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus-ring group"
        >
          <motion.div
            className="relative"
            animate={{ x: [0, -3, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: 'easeInOut',
              repeatDelay: 0.5
            }}
            aria-hidden="true"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </motion.div>
          <span>Back</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
