import { create } from 'zustand'
import type { Texture } from 'three'
import { TextureLoader, SRGBColorSpace } from 'three'
import { TEXTURES, PLANETS } from '../data/portfolio'

interface TextureCacheState {
  textures: Map<string, Texture>
  loading: boolean
  progress: number
  error: string | null
  getTexture: (url: string) => Texture | null
  preloadAll: () => Promise<void>
}

const textureCache = new Map<string, Texture>()

function getAllTextureUrls(): string[] {
  const urls: string[] = [
    TEXTURES.sun,
    TEXTURES.moon,
    TEXTURES.stars,
  ]
  
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
      (error) => {
        console.error(`[TextureCache] Failed to load: ${url}`, error)
        reject(error)
      }
    )
  })
}

export const useTextureCache = create<TextureCacheState>((set, get) => ({
  textures: textureCache,
  loading: false,
  progress: 0,
  error: null,

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
    set({ loading: false, textures: textureCache })
  },
}))

export function useCachedTexture(url: string | undefined): Texture | null {
  const getTexture = useTextureCache((state) => state.getTexture)
  
  if (!url) return null
  return getTexture(url)
}
