import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store'
import {
  AboutPanel,
  SkillsPanel,
  ExperiencePanel,
  ProjectsPanel,
  ArchitecturePanel,
  DevOpsPanel,
  ContactPanel,
  panelVariants,
  SECTION_NAMES,
} from '../panels'
import type { SectionId } from '../../types'

const PANELS: Record<Exclude<SectionId, 'overview'>, React.ComponentType> = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  projects: ProjectsPanel,
  architecture: ArchitecturePanel,
  devops: DevOpsPanel,
  contact: ContactPanel,
}

export function SectionPanel() {
  const activeSection = useAppStore((state) => state.activeSection)

  if (activeSection === 'overview') return null

  const PanelComponent = PANELS[activeSection]

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={activeSection}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="complementary"
        aria-label={SECTION_NAMES[activeSection] || activeSection}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40"
      >
        <PanelComponent />
      </motion.aside>
    </AnimatePresence>
  )
}
