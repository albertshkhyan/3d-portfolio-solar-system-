import { motion } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { DEVOPS_CONTENT } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, staggerContainer, fadeInUp, scaleIn } from './shared'

export function DevOpsPanel() {
  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-lg`}>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        aria-labelledby="devops-title"
      >
        <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-5">
          <PlanetImage sectionId="devops" size="lg" />
          <div className="flex-1 min-w-0">
            <h2 id="devops-title" className={`section-title ${TITLE_SPACING}`}>
              {DEVOPS_CONTENT.title}
            </h2>
            <p className="section-subtitle">Tools and practices for reliable deployments</p>
          </div>
        </motion.div>

        <ul className="grid grid-cols-2 gap-3" role="list" aria-label="DevOps tools">
          {DEVOPS_CONTENT.tools.map((tool, index) => (
            <motion.li
              key={tool.name}
              variants={scaleIn}
              custom={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 glass-card"
            >
              <h3 className="card-title text-orange-300 mb-1">{tool.name}</h3>
              <p className="text-[12px] text-zinc-400 leading-relaxed">{tool.description}</p>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </GlassPanel>
  )
}
