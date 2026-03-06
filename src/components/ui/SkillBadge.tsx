import { motion } from 'framer-motion'
import type { Skill } from '../../types'

interface SkillBadgeProps {
  skill: Skill
}

const skillIconMap: Record<string, string> = {
  'React': 'react',
  'Next.js': 'nextjs',
  'TypeScript': 'ts',
  'React Native': 'react',
  'Node.js': 'nodejs',
  'Nest.js': 'nestjs',
  'Docker': 'docker',
  'AWS': 'aws',
  'PostgreSQL': 'postgres',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'GraphQL': 'graphql',
  'Tailwind': 'tailwind',
  'Tailwind CSS': 'tailwind',
  'Three.js': 'threejs',
  'Git': 'git',
  'CI/CD': 'githubactions',
}

const categoryColors: Record<Skill['category'], { bg: string; border: string; glow: string }> = {
  frontend: { 
    bg: 'hover:bg-blue-500/10', 
    border: 'hover:border-blue-400/30',
    glow: 'hover:shadow-blue-500/20'
  },
  backend: { 
    bg: 'hover:bg-emerald-500/10', 
    border: 'hover:border-emerald-400/30',
    glow: 'hover:shadow-emerald-500/20'
  },
  mobile: { 
    bg: 'hover:bg-amber-500/10', 
    border: 'hover:border-amber-400/30',
    glow: 'hover:shadow-amber-500/20'
  },
  devops: { 
    bg: 'hover:bg-orange-500/10', 
    border: 'hover:border-orange-400/30',
    glow: 'hover:shadow-orange-500/20'
  },
  database: { 
    bg: 'hover:bg-pink-500/10', 
    border: 'hover:border-pink-400/30',
    glow: 'hover:shadow-pink-500/20'
  },
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  const iconId = skillIconMap[skill.name] || 'javascript'
  const iconUrl = `https://skillicons.dev/icons?i=${iconId}`
  const colors = categoryColors[skill.category]

  return (
    <motion.span
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-xl 
        text-[13px] font-medium text-zinc-300
        bg-zinc-900/50 border border-zinc-800/80
        backdrop-blur-sm cursor-default
        transition-all duration-200 ease-out
        hover:text-white hover:shadow-lg
        ${colors.bg} ${colors.border} ${colors.glow}
      `}
    >
      <img 
        src={iconUrl} 
        alt=""
        className="w-4 h-4 rounded"
        loading="lazy"
      />
      <span>{skill.name}</span>
    </motion.span>
  )
}
