import { useFrame, useThree } from '@react-three/fiber'
import { useAppStore } from '../../store'
import { FOG } from '../../config/animation'
import type { Fog } from 'three'

function lerpFog(
  distance: number
): { near: number; far: number } {
  if (distance <= FOG.DENSE_UNTIL) {
    return { near: FOG.DENSE_NEAR, far: FOG.DENSE_FAR }
  }
  if (distance >= FOG.RELAXED_FROM) {
    return { near: FOG.RELAXED_NEAR, far: FOG.RELAXED_FAR }
  }
  const t = (distance - FOG.DENSE_UNTIL) / (FOG.RELAXED_FROM - FOG.DENSE_UNTIL)
  return {
    near: FOG.DENSE_NEAR + t * (FOG.RELAXED_NEAR - FOG.DENSE_NEAR),
    far: FOG.DENSE_FAR + t * (FOG.RELAXED_FAR - FOG.DENSE_FAR),
  }
}

export function DistanceFog() {
  const scene = useThree((s) => s.scene)

  useFrame(() => {
    const fog = scene.fog as Fog | null
    if (!fog || typeof fog.near === 'undefined') return
    const distance = useAppStore.getState().cameraDistance
    const { near, far } = lerpFog(distance)
    fog.near = near
    fog.far = far
  })

  return null
}
