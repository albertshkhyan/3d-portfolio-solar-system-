import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  darker?: boolean
  animated?: boolean
}

export function GlassPanel({ children, className = '', darker = false, animated = true }: GlassPanelProps) {
  if (animated) {
    return (
      <div className="relative group">
        <div 
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 
                     transition-opacity duration-700 blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(6, 182, 212, 0.15) 100%)',
          }}
        />
        <div 
          className="absolute -inset-px rounded-3xl opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(6, 182, 212, 0.2) 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 6s ease infinite',
          }}
        />
        <div className={`relative ${darker ? 'glass-panel-darker' : 'glass-panel'} ${className}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`${darker ? 'glass-panel-darker' : 'glass-panel'} ${className}`}>
      {children}
    </div>
  )
}
