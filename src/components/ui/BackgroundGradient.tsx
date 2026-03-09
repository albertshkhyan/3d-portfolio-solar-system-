import { motion } from 'framer-motion'
import { useAppStore } from '../../store'
import type { SectionId } from '../../types'

const SECTION_THEMES: Record<SectionId, {
  gradient: string
  glow: string
}> = {
  overview: {
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
    glow: 'rgba(99, 102, 241, 0.15)',
  },
  about: {
    gradient: 'radial-gradient(ellipse at 30% 40%, rgba(156, 163, 175, 0.1) 0%, transparent 60%)',
    glow: 'rgba(156, 163, 175, 0.12)',
  },
  skills: {
    gradient: 'radial-gradient(ellipse at 70% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 60%)',
    glow: 'rgba(251, 191, 36, 0.12)',
  },
  experience: {
    gradient: 'radial-gradient(ellipse at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  projects: {
    gradient: 'radial-gradient(ellipse at 60% 40%, rgba(239, 68, 68, 0.1) 0%, transparent 60%)',
    glow: 'rgba(239, 68, 68, 0.12)',
  },
  architecture: {
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 60%)',
    glow: 'rgba(249, 115, 22, 0.12)',
  },
  devops: {
    gradient: 'radial-gradient(ellipse at 70% 60%, rgba(234, 179, 8, 0.1) 0%, transparent 60%)',
    glow: 'rgba(234, 179, 8, 0.12)',
  },
  contact: {
    gradient: 'radial-gradient(ellipse at 30% 70%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
    glow: 'rgba(99, 102, 241, 0.15)',
  },
}

export function BackgroundGradient() {
  const activeSection = useAppStore((state) => state.activeSection)
  const theme = SECTION_THEMES[activeSection]

  return (
    <>
      {/* Base gradient layer */}
      <motion.div
        key={`gradient-${activeSection}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: theme.gradient }}
      />

      {/* Ambient glow */}
      <motion.div
        key={`glow-${activeSection}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 50%)`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5, 5, 16, 0.4) 100%)',
        }}
      />

      {/* Subtle animated particles/dust effect */}
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 60, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </>
  )
}
