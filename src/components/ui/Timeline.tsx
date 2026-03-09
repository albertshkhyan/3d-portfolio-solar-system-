import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2 } from 'lucide-react'
import type { Experience } from '../../types'

interface TimelineProps {
  experiences: Experience[]
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <ol 
      className="relative pl-12" 
      role="list" 
      aria-label="Work experience timeline"
    >
      <div className="timeline-line" aria-hidden="true" />
      
      {experiences.map((exp, index) => {
        const description = Array.isArray(exp.description) 
          ? exp.description.join(' ') 
          : exp.description

        return (
          <motion.li
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ 
              delay: index * 0.1, 
              type: 'spring', 
              damping: 25, 
              stiffness: 200 
            }}
            className="relative mb-8 last:mb-0"
            aria-label={`${exp.title} at ${exp.company}, ${exp.period}`}
          >
            <motion.div 
              className="timeline-dot top-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
              aria-hidden="true"
            />
            
            <article
              className="glass-card p-5"
            >
              <header className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="card-title text-white mb-1">{exp.title}</h3>
                  <div className="flex items-center gap-1.5 text-purple-400">
                    <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="text-[13px] font-medium">{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1 text-[12px] text-zinc-500 shrink-0">
                  <time className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </time>
                  {exp.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </header>

              <p className="text-[13px] text-zinc-400 leading-relaxed">
                {description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <ul 
                  className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-zinc-800/50"
                  role="list"
                  aria-label="Technologies used"
                >
                  {exp.technologies.map((tech: string, i: number) => (
                    <li
                      key={i}
                      className="px-2 py-0.5 text-[11px] font-medium 
                                 bg-zinc-800/50 text-zinc-400 rounded-md
                                 hover:bg-zinc-800 hover:text-zinc-300
                                 transition-colors duration-150"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </motion.li>
        )
      })}
    </ol>
  )
}
