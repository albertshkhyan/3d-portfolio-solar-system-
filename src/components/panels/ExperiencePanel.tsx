import { motion } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { Timeline } from '../ui/Timeline'
import { EXPERIENCES } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, staggerContainer, fadeInUp } from './shared'

export function ExperiencePanel() {
  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-lg max-h-[75vh] overflow-y-auto`}>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        aria-labelledby="experience-title"
      >
        <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-5">
          <PlanetImage sectionId="experience" size="lg" />
          <div className="flex-1 min-w-0">
            <h2 id="experience-title" className={`section-title ${TITLE_SPACING}`}>
              Experience
            </h2>
            <p className="section-subtitle">Professional journey and achievements</p>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Timeline experiences={EXPERIENCES} />
        </motion.div>
      </motion.section>
    </GlassPanel>
  )
}
