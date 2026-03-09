import { motion } from 'framer-motion'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { SkillBadge } from '../ui/SkillBadge'
import { SKILLS } from '../../data/portfolio'
import { PANEL_PADDING, staggerContainer, fadeInUp, scaleIn } from './shared'

const CATEGORIES = ['frontend', 'backend', 'mobile', 'devops', 'database'] as const

const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  devops: 'DevOps',
  database: 'Database',
}

const CATEGORY_DOT_COLORS: Record<(typeof CATEGORIES)[number], string> = {
  frontend: 'bg-blue-500 shadow-blue-500/50',
  backend: 'bg-emerald-500 shadow-emerald-500/50',
  mobile: 'bg-amber-400 shadow-amber-400/50',
  devops: 'bg-orange-500 shadow-orange-500/50',
  database: 'bg-pink-500 shadow-pink-500/50',
}

export function SkillsPanel() {
  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-lg`}>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        aria-labelledby="skills-title"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
          <PlanetImage sectionId="skills" size="md" />
          <h2 id="skills-title" className="section-title">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="space-y-5" role="list" aria-label="Skill categories">
          {CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null

            return (
              <motion.div
                key={category}
                variants={fadeInUp}
                role="listitem"
                aria-labelledby={`category-${category}`}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span
                    className={`w-2 h-2 rounded-full shadow-lg ${CATEGORY_DOT_COLORS[category]}`}
                    aria-hidden="true"
                  />
                  <h3
                    id={`category-${category}`}
                    className="text-[13px] font-semibold text-white uppercase tracking-wider"
                  >
                    {CATEGORY_LABELS[category]}
                  </h3>
                </div>

                <motion.ul
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  role="list"
                  aria-label={`${CATEGORY_LABELS[category]} skills`}
                >
                  {categorySkills.map((skill) => (
                    <motion.li key={skill.name} variants={scaleIn}>
                      <SkillBadge skill={skill} />
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
    </GlassPanel>
  )
}
