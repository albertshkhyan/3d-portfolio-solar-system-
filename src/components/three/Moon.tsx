import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html } from '@react-three/drei'
import type { Mesh } from 'three'
import type { Project } from '../../types'
import { useAppStore, useCachedTexture } from '../../store'
import { TEXTURES } from '../../data/portfolio'

interface MoonProps {
  project: Project
  index: number
}

export function Moon({ project, index }: MoonProps) {
  const groupRef = useRef<Mesh>(null)
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const texture = useCachedTexture(TEXTURES.moon)

  const { activeSection, setActiveProject } = useAppStore()

  const orbitSpeed = 0.3 + index * 0.1
  const initialAngle = (index * Math.PI * 2) / 4
  const angleRef = useRef(initialAngle)

  const isProjectsActive = activeSection === 'projects'

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return

    const isPaused = useAppStore.getState().isPaused

    if (!isPaused) {
      angleRef.current += delta * orbitSpeed
      meshRef.current.rotation.y += delta * 0.5
    }

    const x = Math.cos(angleRef.current) * project.orbitDistance
    const z = Math.sin(angleRef.current) * project.orbitDistance

    groupRef.current.position.x = x
    groupRef.current.position.z = z
  })

  const handleClick = () => {
    if (isProjectsActive) {
      setActiveProject(project.id)
    }
  }

  return (
    <group ref={groupRef}>
      <Sphere
        ref={meshRef}
        args={[project.size, 32, 32]}
        onClick={handleClick}
        onPointerEnter={() => {
          setHovered(true)
          document.body.style.cursor = isProjectsActive ? 'pointer' : 'default'
        }}
        onPointerLeave={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <meshBasicMaterial
          key={texture ? 'textured' : 'color'}
          map={texture}
          color={texture ? undefined : '#b0b0b0'}
          toneMapped={false}
        />
      </Sphere>

      {hovered && isProjectsActive && (
        <Html
          position={[0, project.size + 0.3, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="tooltip visible">
            {project.name}
          </div>
        </Html>
      )}
    </group>
  )
}
