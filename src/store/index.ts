import { create } from 'zustand'
import type { Texture } from 'three'
import { TextureLoader, SRGBColorSpace } from 'three'
import type { SectionId } from '../types'
import { ANIMATION } from '../config/animation'
import { TEXTURES, PLANETS } from '../data/portfolio'

// ============================================================================
// Types
// ============================================================================

export type ZoomIntent = 'in' | 'out' | 'reset' | 'milky-way' | null

interface UIState {
  activeSection: SectionId
  activeProject: string | null
  isTransitioning: boolean
  isPaused: boolean
  isFreeCamera: boolean
  zoomIntent: ZoomIntent
  /** Current camera distance from target (updated from CameraController) */
  cameraDistance: number
  /** Camera spherical angles (radians) for parallax: azimuth (yaw), polar (pitch from top) */
  cameraAzimuth: number
  cameraPolar: number
  /** When true, orbit speeds use Kepler-style (k / sqrt(distance)) */
  useKeplerOrbits: boolean
  /** 3D sun projected to screen (%), for overlay label; visible false when behind camera */
  sunOverlayPosition: { x: number; y: number; visible: boolean }
}

interface UIActions {
  setActiveSection: (section: SectionId) => void
  setActiveProject: (projectId: string | null) => void
  setTransitioning: (transitioning: boolean) => void
  togglePause: () => void
  toggleFreeCamera: () => void
  goBack: () => void
  setZoomIntent: (intent: ZoomIntent) => void
  setCameraDistance: (distance: number) => void
  setCameraSpherical: (azimuth: number, polar: number) => void
  setUseKeplerOrbits: (use: boolean) => void
  setSunOverlayPosition: (pos: { x: number; y: number; visible: boolean }) => void
}

interface TextureState {
  loading: boolean
  progress: number
  error: string | null
}

interface TextureActions {
  getTexture: (url: string) => Texture | null
  preloadAll: () => Promise<void>
}

export interface AppState extends UIState, UIActions, TextureState, TextureActions {}

// ============================================================================
// Constants
// ============================================================================

export const SECTIONS_ORDER: SectionId[] = [
  'about',
  'skills',
  'experience',
  'projects',
  'architecture',
  'devops',
  'contact',
]

// ============================================================================
// Texture Cache (external to avoid re-renders)
// ============================================================================

const textureCache = new Map<string, Texture>()
let hasLoggedTextureWarning = false

function getAllTextureUrls(): string[] {
  const urls: string[] = [TEXTURES.sun, TEXTURES.moon, TEXTURES.stars]
  PLANETS.forEach((planet) => {
    if (planet.texture) urls.push(planet.texture)
    if (planet.ringTexture) urls.push(planet.ringTexture)
  })
  return [...new Set(urls)]
}

function loadTexture(url: string): Promise<Texture> {
  if (textureCache.has(url)) {
    return Promise.resolve(textureCache.get(url)!)
  }

  return new Promise((resolve, reject) => {
    const loader = new TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = SRGBColorSpace
        texture.needsUpdate = true
        textureCache.set(url, texture)
        resolve(texture)
      },
      undefined,
      () => {
        if (!hasLoggedTextureWarning) {
          hasLoggedTextureWarning = true
          console.warn(
            '[TextureCache] Some textures could not be loaded. Add files to public/textures/ (see public/textures/README.md). Using fallback colors.'
          )
        }
        reject(new Error(`Failed to load: ${url}`))
      }
    )
  })
}

// ============================================================================
// Store
// ============================================================================

export const useAppStore = create<AppState>((set, get) => ({
  // UI State
  activeSection: 'overview',
  activeProject: null,
  isTransitioning: false,
  isPaused: false,
  isFreeCamera: false,
  zoomIntent: null,
  cameraDistance: 0,
  cameraAzimuth: 0,
  cameraPolar: Math.PI / 2,
  useKeplerOrbits: false,
  sunOverlayPosition: { x: 50, y: 50, visible: true },

  // Texture State
  loading: false,
  progress: 0,
  error: null,

  // UI Actions
  setActiveSection: (section: SectionId) => {
    const { isTransitioning } = get()
    if (isTransitioning) return

    set({
      isTransitioning: true,
      activeSection: section,
      activeProject: null,
      isFreeCamera: false,
    })
    setTimeout(() => set({ isTransitioning: false }), ANIMATION.CAMERA_TRANSITION_MS)
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
      setTimeout(() => set({ isTransitioning: false }), ANIMATION.CAMERA_TRANSITION_MS)
    }
  },

  setZoomIntent: (intent: ZoomIntent) => {
    set({ zoomIntent: intent })
  },

  setCameraDistance: (distance: number) => {
    set({ cameraDistance: distance })
  },

  setCameraSpherical: (azimuth: number, polar: number) => {
    set({ cameraAzimuth: azimuth, cameraPolar: polar })
  },

  setUseKeplerOrbits: (use: boolean) => {
    set({ useKeplerOrbits: use })
  },

  setSunOverlayPosition: (pos: { x: number; y: number; visible: boolean }) => {
    set({ sunOverlayPosition: pos })
  },

  // Texture Actions
  getTexture: (url: string) => {
    return textureCache.get(url) ?? null
  },

  preloadAll: async () => {
    const urls = getAllTextureUrls()
    const total = urls.length
    let loaded = 0

    set({ loading: true, progress: 0, error: null })

    const loadPromises = urls.map(async (url) => {
      try {
        await loadTexture(url)
        loaded++
        set({ progress: loaded / total })
      } catch {
        console.warn(`[TextureCache] Skipping failed texture: ${url}`)
        loaded++
        set({ progress: loaded / total })
      }
    })

    await Promise.all(loadPromises)
    set({ loading: false })
  },
}))

// ============================================================================
// Hooks (for backward compatibility and convenience)
// ============================================================================

export function useCachedTexture(url: string | undefined): Texture | null {
  const getTexture = useAppStore((state) => state.getTexture)
  if (!url) return null
  return getTexture(url)
}

// Re-export for backward compatibility
export const usePortfolioStore = useAppStore
export const useTextureCache = useAppStore
