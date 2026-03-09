import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import type { Mesh } from 'three'
import { AdditiveBlending } from 'three'
import { TEXTURES } from '../../data/portfolio'
import { useCachedTexture } from '../../store'

export function Sun() {
  const meshRef = useRef<Mesh>(null)
  const glowRef1 = useRef<Mesh>(null)
  const glowRef2 = useRef<Mesh>(null)
  
  const texture = useCachedTexture(TEXTURES.sun)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
    if (glowRef1.current) {
      glowRef1.current.rotation.y -= delta * 0.02
    }
    if (glowRef2.current) {
      glowRef2.current.rotation.y += delta * 0.03
    }
  })

  return (
    <group>
      <Sphere ref={glowRef1} args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#ff4500"
          transparent
          opacity={0.08}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere ref={glowRef2} args={[2.0, 32, 32]}>
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.15}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <meshBasicMaterial
          key={texture ? 'textured' : 'color'}
          map={texture}
          color={texture ? undefined : '#ffa500'}
          toneMapped={false}
        />
      </Sphere>

      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#fff5e6"
        distance={100}
        decay={2}
      />

      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color="#ff8c00"
        distance={50}
        decay={1}
      />
    </group>
  )
}
