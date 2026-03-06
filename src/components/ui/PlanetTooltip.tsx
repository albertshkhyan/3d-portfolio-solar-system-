import { motion } from 'framer-motion'
import { 
  User, 
  Code2, 
  Briefcase, 
  Rocket, 
  Layers, 
  Server, 
  Mail,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import type { SectionId } from '../../types'

interface PlanetTooltipProps {
  sectionId: SectionId
  label: string
  keyNumber: number
}

const SECTION_DATA: Record<SectionId, {
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
}> = {
  overview: {
    description: '',
    icon: null,
    color: '',
    gradient: '',
  },
  about: {
    description: 'Learn about my journey, passion, and what drives me as a developer',
    icon: <User className="w-4 h-4" />,
    color: 'text-zinc-400',
    gradient: 'from-zinc-500/20 to-zinc-600/10',
  },
  skills: {
    description: 'Explore my technical toolkit across frontend, backend, and DevOps',
    icon: <Code2 className="w-4 h-4" />,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-600/10',
  },
  experience: {
    description: 'My professional journey and career milestones',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-600/10',
  },
  projects: {
    description: 'Featured work showcasing real-world applications',
    icon: <Rocket className="w-4 h-4" />,
    color: 'text-red-400',
    gradient: 'from-red-500/20 to-orange-600/10',
  },
  architecture: {
    description: 'System design principles and engineering patterns I follow',
    icon: <Layers className="w-4 h-4" />,
    color: 'text-orange-300',
    gradient: 'from-orange-500/20 to-amber-600/10',
  },
  devops: {
    description: 'Infrastructure, CI/CD, and deployment practices',
    icon: <Server className="w-4 h-4" />,
    color: 'text-yellow-300',
    gradient: 'from-yellow-500/20 to-amber-600/10',
  },
  contact: {
    description: 'Get in touch — let\'s build something amazing together',
    icon: <Mail className="w-4 h-4" />,
    color: 'text-indigo-400',
    gradient: 'from-indigo-500/20 to-purple-600/10',
  },
}

export function PlanetTooltip({ sectionId, label, keyNumber }: PlanetTooltipProps) {
  const data = SECTION_DATA[sectionId]
  
  if (!data || sectionId === 'overview') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      className="pointer-events-none select-none"
    >
      <div 
        className={`
          relative overflow-hidden
          bg-gradient-to-br ${data.gradient}
          backdrop-blur-xl
          border border-white/10
          rounded-2xl
          p-4 min-w-[220px] max-w-[260px]
          shadow-2xl shadow-black/40
        `}
      >
        {/* Decorative glow */}
        <div 
          className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 ${data.color.replace('text-', 'bg-')}`}
          aria-hidden="true"
        />
        
        {/* Header */}
        <div className="relative flex items-center gap-2.5 mb-2">
          <div className={`p-1.5 rounded-lg bg-white/10 ${data.color}`}>
            {data.icon}
          </div>
          <h3 className="text-[15px] font-semibold text-white">
            {label}
          </h3>
        </div>

        {/* Description */}
        <p className="relative text-[12px] text-zinc-400 leading-relaxed mb-3">
          {data.description}
        </p>

        {/* Footer */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-purple-300">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            <span>Click to explore</span>
            <ChevronRight className="w-3 h-3 animate-bounce-subtle" aria-hidden="true" />
          </div>
          
          <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] font-mono text-zinc-400">
            {keyNumber}
          </kbd>
        </div>
      </div>
    </motion.div>
  )
}
