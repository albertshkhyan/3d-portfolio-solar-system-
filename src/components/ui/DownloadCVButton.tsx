import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import { useViewport } from '../../hooks/useViewport'
import resumePdf from '../../assets/cv/Albert_Shkhyan_Resume.pdf'

export function DownloadCVButton() {
  const { isMobile } = useViewport()

  return (
    <motion.a
      href={resumePdf}
      download="Albert_Shkhyan_Resume.pdf"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
      aria-label="Download resume as PDF"
      className={`fixed z-50 group ${isMobile ? 'bottom-[14rem] left-4' : 'bottom-8 left-[88px]'}`}
    >
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-2xl animate-ping-slow bg-purple-500/20" />
      <span className="absolute inset-0 rounded-2xl animate-pulse-glow" />
      
      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2.5 px-4 py-3 
                   glass-panel text-zinc-300 hover:text-white
                   transition-colors duration-200 focus-ring"
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: 'easeInOut' 
          }}
        >
          <FileDown className="w-5 h-5 text-purple-400" />
        </motion.div>
        <span className="text-[13px] font-medium">Resume</span>
        
        {/* Hover tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 
                         px-2.5 py-1.5 rounded-lg
                         bg-zinc-900/95 border border-zinc-700/50
                         text-[11px] text-zinc-300 whitespace-nowrap
                         opacity-0 group-hover:opacity-100
                         transform scale-95 group-hover:scale-100
                         transition-all duration-200 pointer-events-none">
          Download PDF
        </span>
      </motion.div>
    </motion.a>
  )
}
