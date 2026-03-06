import { create } from 'zustand'
import type { PortfolioState, SectionId } from '../types'

export const SECTIONS_ORDER: SectionId[] = [
  'about',
  'skills',
  'experience',
  'projects',
  'architecture',
  'devops',
  'contact',
]

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  activeSection: 'overview',
  activeProject: null,
  isTransitioning: false,
  isPaused: false,
  isFreeCamera: false,

  setActiveSection: (section: SectionId) => {
    const { isTransitioning } = get()
    if (isTransitioning) return

    set({ isTransitioning: true, activeSection: section, activeProject: null, isFreeCamera: false })
    setTimeout(() => set({ isTransitioning: false }), 1500)
  },

  setActiveProject: (projectId: string | null) => {
    set({ activeProject: projectId })
  },

  setTransitioning: (transitioning: boolean) => {
    set({ isTransitioning: transitioning })
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }))
  },

  toggleFreeCamera: () => {
    set((state) => ({ isFreeCamera: !state.isFreeCamera }))
  },

  goBack: () => {
    const { activeProject, isTransitioning } = get()
    if (isTransitioning) return

    if (activeProject) {
      set({ activeProject: null })
    } else {
      set({ isTransitioning: true, activeSection: 'overview', isFreeCamera: false })
      setTimeout(() => set({ isTransitioning: false }), 1500)
    }
  },
}))
