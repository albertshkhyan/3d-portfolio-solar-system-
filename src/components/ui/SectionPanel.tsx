import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, MapPin, Sparkles } from 'lucide-react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { GlassPanel } from './GlassPanel'
import { Timeline } from './Timeline'
import { SkillBadge } from './SkillBadge'
import { ProjectCard } from './ProjectCard'
import { PlanetImage } from './PlanetImage'
import {
  ABOUT_CONTENT,
  SKILLS,
  EXPERIENCES,
  PROJECTS,
  ARCHITECTURE_CONTENT,
  DEVOPS_CONTENT,
  CONTACT_CONTENT,
} from '../../data/portfolio'

const PANEL_PADDING = 'px-7 py-6'
const TITLE_SPACING = 'mb-1'
const CONTENT_SPACING = 'space-y-4'

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const fadeInUp: Variants = {
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
    }
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring' as const, 
      damping: 20, 
      stiffness: 300 
    }
  },
}

function AboutPanel() {
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
            <li 
              key={i} 
              className="flex items-start gap-3 text-[14px]"
            >
              <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-zinc-200">{highlight}</span>
            </li>
          ))}
        </motion.ul>
        
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-[13px] text-zinc-500 pt-2 border-t border-zinc-800">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span aria-label="Location">{ABOUT_CONTENT.location}</span>
        </motion.div>
      </motion.article>
    </GlassPanel>
  )
}

function SkillsPanel() {
  const categories = ['frontend', 'backend', 'mobile', 'devops', 'database'] as const
  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    devops: 'DevOps',
    database: 'Database',
  }
  const categoryDotColors = {
    frontend: 'bg-blue-500 shadow-blue-500/50',
    backend: 'bg-emerald-500 shadow-emerald-500/50',
    mobile: 'bg-amber-400 shadow-amber-400/50',
    devops: 'bg-orange-500 shadow-orange-500/50',
    database: 'bg-pink-500 shadow-pink-500/50',
  }

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
          {categories.map((category) => {
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
                    className={`w-2 h-2 rounded-full shadow-lg ${categoryDotColors[category]}`} 
                    aria-hidden="true" 
                  />
                  <h3 
                    id={`category-${category}`}
                    className="text-[13px] font-semibold text-white uppercase tracking-wider"
                  >
                    {categoryLabels[category]}
                  </h3>
                </div>
                <motion.ul 
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  role="list"
                  aria-label={`${categoryLabels[category]} skills`}
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

function ExperiencePanel() {
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
            <p className="section-subtitle">
              Professional journey and achievements
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Timeline experiences={EXPERIENCES} />
        </motion.div>
      </motion.section>
    </GlassPanel>
  )
}

function ProjectsPanel() {
  const { activeProject, setActiveProject } = usePortfolioStore()
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
              <p className="section-subtitle">
                Click on a moon or select below to explore
              </p>
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
          <ProjectCard
            project={selectedProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function ArchitecturePanel() {
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
            <p className="section-subtitle">
              Core engineering principles and patterns
            </p>
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

function DevOpsPanel() {
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
            <p className="section-subtitle">
              Tools and practices for reliable deployments
            </p>
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

function ContactPanel() {
  const links = [
    {
      name: 'Email',
      href: `mailto:${CONTACT_CONTENT.email}`,
      icon: <Mail className="w-5 h-5" aria-hidden="true" />,
      value: CONTACT_CONTENT.email,
      color: 'group-hover:text-red-400',
      label: 'Send an email',
    },
    {
      name: 'GitHub',
      href: CONTACT_CONTENT.github,
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
      value: 'albertshkhyan',
      color: 'group-hover:text-white',
      label: 'View GitHub profile',
    },
    {
      name: 'LinkedIn',
      href: CONTACT_CONTENT.linkedin,
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
      value: 'albertshkhyan',
      color: 'group-hover:text-blue-400',
      label: 'Connect on LinkedIn',
    },
    {
      name: 'Twitter',
      href: CONTACT_CONTENT.twitter,
      icon: <Twitter className="w-5 h-5" aria-hidden="true" />,
      value: '@albertshkhyan',
      color: 'group-hover:text-sky-400',
      label: 'Follow on Twitter',
    },
  ]

  return (
    <GlassPanel className={`${PANEL_PADDING} max-w-md`}>
      <motion.section 
        variants={staggerContainer} 
        initial="hidden" 
        animate="visible"
        aria-labelledby="contact-title"
      >
        <motion.div variants={fadeInUp} className="flex items-start gap-4 mb-5">
          <PlanetImage sectionId="contact" size="lg" />
          <div className="flex-1 min-w-0">
            <h2 id="contact-title" className={`section-title ${TITLE_SPACING}`}>
              Get in Touch
            </h2>
            <p className="section-subtitle">
              Let's build something amazing together
            </p>
          </div>
        </motion.div>
        <nav className="space-y-3" aria-label="Contact links">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              variants={fadeInUp}
              custom={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={link.label}
              className="flex items-center gap-4 p-4 glass-card group focus-ring"
            >
              <div className={`p-2.5 rounded-xl bg-zinc-800/50 text-zinc-500 transition-colors ${link.color}`}>
                {link.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[15px] text-white">{link.name}</p>
                <p className="text-[13px] text-zinc-500 truncate">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </nav>
      </motion.section>
    </GlassPanel>
  )
}

const panelVariants: Variants = {
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
    }
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
    }
  },
}

const SECTION_NAMES: Record<string, string> = {
  about: 'About Me',
  skills: 'Skills & Technologies',
  experience: 'Work Experience',
  projects: 'Projects',
  architecture: 'System Architecture',
  devops: 'DevOps & Infrastructure',
  contact: 'Contact Information',
}

export function SectionPanel() {
  const activeSection = usePortfolioStore((state) => state.activeSection)

  const panels: Record<string, React.ReactNode> = {
    about: <AboutPanel />,
    skills: <SkillsPanel />,
    experience: <ExperiencePanel />,
    projects: <ProjectsPanel />,
    architecture: <ArchitecturePanel />,
    devops: <DevOpsPanel />,
    contact: <ContactPanel />,
  }

  return (
    <AnimatePresence mode="wait">
      {activeSection !== 'overview' && (
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
          {panels[activeSection]}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
