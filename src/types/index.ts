import type { Vector3Tuple } from 'three'

export type SectionId =
  | 'overview'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'architecture'
  | 'devops'
  | 'contact'

export interface Planet {
  id: SectionId
  name: string
  label: string
  distance: number
  size: number
  color: string
  emissive?: string
  orbitSpeed: number
  rotationSpeed: number
  initialAngle: number
  hasRings?: boolean
  cameraOffset: Vector3Tuple
  texture?: string
  ringTexture?: string
}

export interface Project {
  id: string
  name: string
  description: string
  image?: string
  technologies: string[]
  github?: string
  demo?: string
  orbitDistance: number
  size: number
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'mobile'
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

export interface PortfolioState {
  activeSection: SectionId
  activeProject: string | null
  isTransitioning: boolean
  isPaused: boolean
  isFreeCamera: boolean
  setActiveSection: (section: SectionId) => void
  setActiveProject: (projectId: string | null) => void
  setTransitioning: (transitioning: boolean) => void
  togglePause: () => void
  toggleFreeCamera: () => void
  goBack: () => void
}
