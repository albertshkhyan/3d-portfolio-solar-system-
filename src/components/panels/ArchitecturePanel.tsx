import { motion } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { ARCHITECTURE_CONTENT } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, CONTENT_SPACING, staggerContainer, fadeInUp } from './shared'

export function ArchitecturePanel() {
  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-lg max-h-[75vh] overflow-y-auto`}>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        aria-labelledby="architecture-title"
      >
        <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-5">
          <PlanetImage sectionId="architecture" size="lg" />
          <div className="flex-1 min-w-0">
            <h2 id="architecture-title" className={`section-title ${TITLE_SPACING}`}>
              {ARCHITECTURE_CONTENT.title}
            </h2>
            <p className="section-subtitle">Core engineering principles and patterns</p>
          </div>
        </motion.div>

        <ul className={CONTENT_SPACING} role="list" aria-label="Architecture topics">
          {ARCHITECTURE_CONTENT.topics.map((topic, index) => (
            <motion.li
              key={topic.name}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.01 }}
              className="p-4 glass-card"
            >
              <h3 className="card-title text-purple-300 mb-1.5">{topic.name}</h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">{topic.description}</p>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </GlassPanel>
  )
}
