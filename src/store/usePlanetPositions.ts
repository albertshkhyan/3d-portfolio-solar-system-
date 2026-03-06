import type { SectionId } from '../types'

export interface PlanetPosition {
  angle: number
  x: number
  z: number
}

type PositionSubscriber = (id: SectionId, position: PlanetPosition) => void

class PlanetPositionStore {
  private positions = new Map<SectionId, PlanetPosition>()
  private subscribers = new Set<PositionSubscriber>()

  setPosition(id: SectionId, position: PlanetPosition): void {
    this.positions.set(id, position)
  }

  getPosition(id: SectionId): PlanetPosition | undefined {
    return this.positions.get(id)
  }

  getAllPositions(): Map<SectionId, PlanetPosition> {
    return this.positions
  }

  subscribe(callback: PositionSubscriber): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }
}

export const planetPositions = new PlanetPositionStore()

export const usePlanetPositions = {
  getState: () => ({
    getPosition: (id: SectionId) => planetPositions.getPosition(id),
    setPosition: (id: SectionId, position: PlanetPosition) => planetPositions.setPosition(id, position),
    getAllPositions: () => planetPositions.getAllPositions(),
  }),
}
