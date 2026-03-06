import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'
import { GlassPanel } from './GlassPanel'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface ProjectCardProps {
  project: Project
  onClose: () => void
}

export function ProjectCard({ project, onClose }: ProjectCardProps) {
  const containerRef = useFocusTrap<HTMLDivElement>({
    isActive: true,
    onEscape: onClose,
  })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      aria-describedby="project-description"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <GlassPanel className="relative max-w-lg w-full px-7 py-6">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close project details"
            className="absolute top-4 right-4 p-2 rounded-xl text-zinc-500
                       hover:text-white hover:bg-white/10 
                       transition-colors duration-200 focus-ring"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </motion.button>

          <div className="mb-1">
            <span className="label text-purple-400">Featured Project</span>
          </div>
          <h2 id="project-title" className="section-title text-white mb-4 pr-10">
            {project.name}
          </h2>
          
          <p id="project-description" className="text-zinc-300 mb-6 leading-relaxed text-[15px]">
            {project.description}
          </p>
          
          <div className="mb-6">
            <h3 className="label mb-3">Tech Stack</h3>
            <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
              {project.technologies.map((tech, index) => (
                <motion.li
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span
                    className="px-3 py-1.5 text-[13px] font-medium
                               bg-purple-500/10 text-purple-300 
                               border border-purple-500/20 rounded-lg
                               hover:bg-purple-500/15 hover:border-purple-500/30
                               transition-colors duration-200 inline-block"
                  >
                    {tech}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <nav className="flex gap-3 pt-5 border-t border-zinc-800/50" aria-label="Project links">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View ${project.name} source code on GitHub`}
                className="btn-secondary group"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>View Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" aria-hidden="true" />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View ${project.name} live demo`}
                className="btn-primary group"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" aria-hidden="true" />
              </motion.a>
            )}
          </nav>
        </GlassPanel>
      </motion.div>
    </div>
  )
}
