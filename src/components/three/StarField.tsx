import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import type { Group } from 'three'
import { useAppStore } from '../../store'
import { ANIMATION } from '../../config/animation'

const PARALLAX = ANIMATION.STAR_FIELD_PARALLAX_FACTOR
const POLAR_NEUTRAL = Math.PI / 2

export function StarField() {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    const { cameraAzimuth, cameraPolar } = useAppStore.getState()
    group.rotation.y = cameraAzimuth * PARALLAX
    group.rotation.x = (cameraPolar - POLAR_NEUTRAL) * PARALLAX
  })

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Stars
        radius={150}
        depth={100}
        count={2000}
        factor={6}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </group>
  )
}
