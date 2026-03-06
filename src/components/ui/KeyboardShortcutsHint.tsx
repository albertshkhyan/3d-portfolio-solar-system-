import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X } from 'lucide-react'

const SHORTCUTS = [
  { key: '1-7', action: 'Navigate to sections' },
  { key: 'Esc', action: 'Go back' },
  { key: '0', action: 'Return to overview' },
]

export function KeyboardShortcutsHint() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('keyboard-hints-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('keyboard-hints-dismissed', 'true')
  }

  const handleToggle = () => {
    if (isDismissed) {
      setIsVisible(true)
      setIsDismissed(false)
      localStorage.removeItem('keyboard-hints-dismissed')
    } else {
      handleDismiss()
    }
  }

  return (
    <>
      <motion.button
        onClick={handleToggle}
        aria-label="Toggle keyboard shortcuts help"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 glass-panel rounded-xl
                   flex items-center justify-center
                   text-zinc-400 hover:text-white transition-all duration-200
                   hover:bg-white/10 focus-ring"
      >
        <Keyboard className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isVisible && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="tooltip"
            aria-label="Keyboard shortcuts"
            className="fixed bottom-[88px] left-8 z-50 w-[280px]
                       bg-zinc-900/95 backdrop-blur-xl
                       border border-white/10 rounded-2xl
                       shadow-2xl shadow-black/50
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 
                            border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 
                                flex items-center justify-center">
                  <Keyboard className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-white">
                  Keyboard Shortcuts
                </span>
              </div>
              <motion.button
                onClick={handleDismiss}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Dismiss keyboard shortcuts"
                className="w-7 h-7 rounded-lg flex items-center justify-center
                           text-zinc-500 hover:text-white hover:bg-white/10 
                           transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <ul className="space-y-2" role="list">
                {SHORTCUTS.map(({ key, action }, index) => (
                  <motion.li 
                    key={key} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-2.5 rounded-xl
                               hover:bg-white/5 transition-colors group"
                  >
                    <kbd className="inline-flex items-center justify-center
                                    min-w-[48px] h-9 px-3
                                    bg-zinc-800/80 border border-zinc-700/50
                                    rounded-lg shadow-sm
                                    text-xs font-mono font-medium text-zinc-200
                                    group-hover:border-purple-500/30 
                                    group-hover:bg-zinc-800 transition-colors">
                      {key}
                    </kbd>
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-300 
                                     transition-colors">
                      {action}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
