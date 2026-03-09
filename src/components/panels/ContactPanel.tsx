import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { GlassPanel } from '../ui/GlassPanel'
import { PlanetImage } from '../ui/PlanetImage'
import { CONTACT_CONTENT } from '../../data/portfolio'
import { PANEL_PADDING, TITLE_SPACING, staggerContainer, fadeInUp } from './shared'

const CONTACT_LINKS = [
  {
    name: 'Email',
    href: `mailto:${CONTACT_CONTENT.email}`,
    icon: Mail,
    value: CONTACT_CONTENT.email,
    color: 'group-hover:text-red-400',
    label: 'Send an email',
  },
  {
    name: 'GitHub',
    href: CONTACT_CONTENT.github,
    icon: Github,
    value: 'albertshkhyan',
    color: 'group-hover:text-white',
    label: 'View GitHub profile',
  },
  {
    name: 'LinkedIn',
    href: CONTACT_CONTENT.linkedin,
    icon: Linkedin,
    value: 'albertshkhyan',
    color: 'group-hover:text-blue-400',
    label: 'Connect on LinkedIn',
  },
  {
    name: 'Twitter',
    href: CONTACT_CONTENT.twitter,
    icon: Twitter,
    value: '@albertshkhyan',
    color: 'group-hover:text-sky-400',
    label: 'Follow on Twitter',
  },
]

export function ContactPanel() {
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
            <p className="section-subtitle">Let's build something amazing together</p>
          </div>
        </motion.div>

        <nav className="space-y-3" aria-label="Contact links">
          {CONTACT_LINKS.map((link, index) => {
            const Icon = link.icon
            return (
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
                <div
                  className={`p-2.5 rounded-xl bg-zinc-800/50 text-zinc-500 transition-colors ${link.color}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[15px] text-white">{link.name}</p>
                  <p className="text-[13px] text-zinc-500 truncate">{link.value}</p>
                </div>
              </motion.a>
            )
          })}
        </nav>
      </motion.section>
    </GlassPanel>
  )
}
