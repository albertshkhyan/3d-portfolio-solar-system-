import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import type { Skill } from '../../types'
import { usePortfolioStore } from '../../store/usePortfolioStore'

interface AsteroidProps {
  skill: Skill
  index: number
  total: number
}

const skillIconMap: Record<string, string> = {
  'React': 'react',
  'Next.js': 'nextjs',
  'TypeScript': 'ts',
  'React Native': 'react',
  'Node.js': 'nodejs',
  'Nest.js': 'nestjs',
  'Docker': 'docker',
  'AWS': 'aws',
  'PostgreSQL': 'postgres',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'GraphQL': 'graphql',
  'Tailwind': 'tailwind',
  'Three.js': 'threejs',
  'Git': 'git',
  'CI/CD': 'githubactions',
}

const categoryRings: Record<Skill['category'], number> = {
  frontend: 1.2,
  backend: 1.6,
  mobile: 2.0,
  devops: 2.4,
  database: 2.8,
}

export function Asteroid({ skill, index, total }: AsteroidProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const { activeSection } = usePortfolioStore()
  const isSkillsActive = activeSection === 'skills'

  const orbitRadius = categoryRings[skill.category]
  const baseAngle = (index / total) * Math.PI * 2
  
  const angleRef = useRef(baseAngle)

  const iconId = skillIconMap[skill.name] || 'javascript'
  const iconUrl = `https://skillicons.dev/icons?i=${iconId}`

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const isPaused = usePortfolioStore.getState().isPaused

    if (!isPaused) {
      const speedMultiplier = isSkillsActive ? 0.03 : 0.1
      const currentSpeed = hovered ? 0 : speedMultiplier
      angleRef.current += delta * currentSpeed
    }

    const x = Math.cos(angleRef.current) * orbitRadius
    const z = Math.sin(angleRef.current) * orbitRadius

    groupRef.current.position.x = x
    groupRef.current.position.y = 0
    groupRef.current.position.z = z
  })

  const size = isSkillsActive ? 12 : 8

  return (
    <group ref={groupRef}>
      <Html
        center
        occlude={false}
        zIndexRange={[100, 0]}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, filter 0.2s ease',
            transform: hovered ? 'scale(1.25)' : 'scale(1)',
            filter: hovered ? 'drop-shadow(0 0 12px rgba(255,255,255,0.8))' : 'none',
          }}
          onMouseEnter={() => {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onMouseLeave={() => {
            setHovered(false)
            document.body.style.cursor = 'default'
          }}
        >
          <img
            src={iconUrl}
            alt={skill.name}
            width={size}
            height={size}
            style={{
              display: 'block',
              borderRadius: '2px',
              width: '100%',
              height: '100%',
            }}
            draggable={false}
            onLoad={() => console.log(`[Skill] Icon loaded: ${skill.name}`)}
            onError={() => console.error(`[Skill] Icon failed: ${skill.name}`)}
          />
        </div>
      </Html>

      {hovered && (
        <Html 
          position={[0, 0.5, 0]} 
          center
          occlude={false}
          style={{ pointerEvents: 'none' }}
        >
          <div className="tooltip visible whitespace-nowrap">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  )
}
