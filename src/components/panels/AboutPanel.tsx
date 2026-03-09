import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { ABOUT_CONTENT } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, staggerContainer, fadeInUp } from './shared'

export function AboutPanel() {
  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-md`}>
      <motion.article
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        aria-labelledby="about-title"
      >
        <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-4">
          <PlanetImage sectionId="about" size="lg" />
          <div className="flex-1 min-w-0">
            <h2 id="about-title" className={`section-title ${TITLE_SPACING}`}>
              About Me
            </h2>
            <p className="section-subtitle">
              Passionate about building exceptional digital experiences
            </p>
          </div>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-zinc-300 mb-5 leading-relaxed text-[15px]">
          {ABOUT_CONTENT.bio}
        </motion.p>

        <motion.ul
          variants={fadeInUp}
          className="space-y-2.5 mb-5"
          aria-label="Key highlights"
          role="list"
        >
          {ABOUT_CONTENT.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px]">
              <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-zinc-200">{highlight}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-2 text-[13px] text-zinc-500 pt-2 border-t border-zinc-800"
        >
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span aria-label="Location">{ABOUT_CONTENT.location}</span>
        </motion.div>
      </motion.article>
    </GlassPanel>
  )
}
