import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import type { Points } from 'three'

export function StarField() {
  const starsRef = useRef<Points>(null)

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01
      starsRef.current.rotation.x += delta * 0.005
    }
  })

  return (
    <>
      <Stars
        ref={starsRef}
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
    </>
  )
}
