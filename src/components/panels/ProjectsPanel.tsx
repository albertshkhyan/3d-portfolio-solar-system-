import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { ProjectCard } from '../ui/ProjectCard'
import { useAppStore } from '../../store'
import { PROJECTS } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, CONTENT_SPACING, staggerContainer, fadeInUp } from './shared'

export function ProjectsPanel() {
  const activeProject = useAppStore((state) => state.activeProject)
  const setActiveProject = useAppStore((state) => state.setActiveProject)
  const selectedProject = PROJECTS.find((p) => p.id === activeProject)

  return (
    <>
      <GlassPanel className={`${PANEL_PADDING} max-w-lg`}>
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          aria-labelledby="projects-title"
        >
          <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-5">
            <PlanetImage sectionId="projects" size="lg" />
            <div className="flex-1 min-w-0">
              <h2 id="projects-title" className={`section-title ${TITLE_SPACING}`}>
                Projects
              </h2>
              <p className="section-subtitle">Click on a moon or select below to explore</p>
            </div>
          </motion.div>

          <nav className={CONTENT_SPACING} aria-label="Project list">
            {PROJECTS.map((project, index) => (
              <motion.button
                key={project.id}
                variants={fadeInUp}
                custom={index}
                onClick={() => setActiveProject(project.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-label={`View details for ${project.name}`}
                aria-haspopup="dialog"
                className="w-full text-left p-4 glass-card group focus-ring"
              >
                <h3 className="card-title text-white group-hover:text-purple-300 transition-colors mb-1">
                  {project.name}
                </h3>
                <p className="text-[13px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </motion.button>
            ))}
          </nav>
        </motion.section>
      </GlassPanel>

      <AnimatePresence>
        {selectedProject && (
          <ProjectCard project={selectedProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
