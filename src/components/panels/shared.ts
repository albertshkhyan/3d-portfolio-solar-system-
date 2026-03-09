import type { Variants } from 'framer-motion'

export const PANEL_PADDING = 'px-7 py-6'
export const TITLE_SPACING = 'mb-1'
export const CONTENT_SPACING = 'space-y-4'

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 200,
      opacity: { duration: 0.3 },
      filter: { duration: 0.3 },
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
}

export const panelVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(16px)',
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 150,
      mass: 1,
      delay: 0.3,
      opacity: { duration: 0.4, delay: 0.2 },
      filter: { duration: 0.5, delay: 0.2 },
    },
  },
  exit: {
    x: -60,
    opacity: 0,
    scale: 0.98,
    filter: 'blur(8px)',
    transition: {
      type: 'tween' as const,
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export const SECTION_NAMES: Record<string, string> = {
  about: 'About Me',
  skills: 'Skills & Technologies',
  experience: 'Work Experience',
  projects: 'Projects',
  architecture: 'System Architecture',
  devops: 'DevOps & Infrastructure',
  contact: 'Contact Information',
}
