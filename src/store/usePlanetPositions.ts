import { create } from 'zustand'
import type { SectionId } from '../types'

interface PlanetPosition {
  angle: number
  x: number
  z: number
}

interface PlanetPositionsState {
  positions: Map<SectionId, PlanetPosition>
  setPosition: (id: SectionId, position: PlanetPosition) => void
  getPosition: (id: SectionId) => PlanetPosition | undefined
}

export const usePlanetPositions = create<PlanetPositionsState>((set, get) => ({
  positions: new Map(),

  setPosition: (id, position) => {
    set((state) => {
      const newPositions = new Map(state.positions)
      newPositions.set(id, position)
      return { positions: newPositions }
    })
  },

  getPosition: (id) => {
    return get().positions.get(id)
  },
}))
