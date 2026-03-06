import { useState } from 'react'
import { GlassPanel } from '../ui/GlassPanel'
import { Timeline } from '../ui/Timeline'
import { SkillBadge } from '../ui/SkillBadge'
import {
  DEVELOPER,
  PLANETS,
  ABOUT_CONTENT,
  SKILLS,
  EXPERIENCES,
  PROJECTS,
  ARCHITECTURE_CONTENT,
  DEVOPS_CONTENT,
  CONTACT_CONTENT,
} from '../../data/portfolio'

interface SectionCardProps {
  planet: (typeof PLANETS)[number]
  isActive: boolean
  onClick: () => void
}

function SectionCard({ planet, isActive, onClick }: SectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center
                  transition-all duration-300 ${
                    isActive
                      ? 'scale-110 ring-2 ring-purple-500'
                      : 'opacity-70 hover:opacity-100'
                  }`}
      style={{ backgroundColor: planet.color }}
    >
      <span className="text-xs font-medium text-white text-center px-1 drop-shadow-lg">
        {planet.label.split(' ')[0]}
      </span>
    </button>
  )
}

function AboutContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">About Me</h2>
      <p className="text-gray-300 text-sm leading-relaxed">{ABOUT_CONTENT.bio}</p>
      <div className="space-y-2">
        {ABOUT_CONTENT.highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">✦</span>
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function ExperienceContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Experience</h2>
      <Timeline experiences={EXPERIENCES} />
    </div>
  )
}

function ProjectsContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const project = PROJECTS.find((p) => p.id === selected)

  if (project) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-purple-400 text-sm"
        >
          ← Back to projects
        </button>
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p className="text-gray-300 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 rounded text-sm"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-600 rounded text-sm"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="space-y-3">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className="w-full text-left p-3 bg-white/5 rounded-lg"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function ArchitectureContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Architecture</h2>
      <div className="space-y-3">
        {ARCHITECTURE_CONTENT.topics.map((topic) => (
          <div key={topic.name} className="p-3 bg-white/5 rounded-lg">
            <h3 className="font-semibold text-purple-300">{topic.name}</h3>
            <p className="text-sm text-gray-400">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DevOpsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">DevOps</h2>
      <div className="grid grid-cols-2 gap-3">
        {DEVOPS_CONTENT.tools.map((tool) => (
          <div key={tool.name} className="p-3 bg-white/5 rounded-lg">
            <h3 className="font-semibold text-orange-300 text-sm">{tool.name}</h3>
            <p className="text-xs text-gray-400">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Contact</h2>
      <p className="text-gray-400 text-sm">Let's build something amazing together</p>
      <div className="space-y-3">
        <a
          href={`mailto:${CONTACT_CONTENT.email}`}
          className="block p-3 bg-white/5 rounded-lg"
        >
          <p className="font-medium">Email</p>
          <p className="text-sm text-gray-400">{CONTACT_CONTENT.email}</p>
        </a>
        <a
          href={CONTACT_CONTENT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-white/5 rounded-lg"
        >
          <p className="font-medium">GitHub</p>
          <p className="text-sm text-gray-400">albertshkhyan</p>
        </a>
        <a
          href={CONTACT_CONTENT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-white/5 rounded-lg"
        >
          <p className="font-medium">LinkedIn</p>
          <p className="text-sm text-gray-400">albertshkhyan</p>
        </a>
      </div>
    </div>
  )
}

const sectionContent: Record<string, JSX.Element> = {
  about: <AboutContent />,
  skills: <SkillsContent />,
  experience: <ExperienceContent />,
  projects: <ProjectsContent />,
  architecture: <ArchitectureContent />,
  devops: <DevOpsContent />,
  contact: <ContactContent />,
}

export function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePlanet = PLANETS[activeIndex]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2e] to-[#0a1a2a]">
      <header className="p-6 text-center">
        <h1 className="text-xl font-bold glow-text">{DEVELOPER.name}</h1>
        <p className="text-purple-300 text-sm">{DEVELOPER.title}</p>
      </header>

      <div className="px-4 py-2 overflow-x-auto">
        <div className="flex gap-4 justify-center">
          {PLANETS.map((planet, index) => (
            <SectionCard
              key={planet.id}
              planet={planet}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <GlassPanel className="p-5 min-h-full">
          {sectionContent[activePlanet.id]}
        </GlassPanel>
      </div>

      <footer className="p-4 text-center">
        <p className="text-xs text-gray-500">
          {activeIndex + 1} / {PLANETS.length} · {activePlanet.label}
        </p>
      </footer>
    </div>
  )
}
