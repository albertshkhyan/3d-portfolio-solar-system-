import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Html, Ring } from '@react-three/drei'
import { DoubleSide, MathUtils } from 'three'
import type { Mesh, Group } from 'three'
import type { Planet as PlanetType } from '../../types'
import { useAppStore, SECTIONS_ORDER, useCachedTexture } from '../../store'
import { planetPositions } from '../../store/usePlanetPositions'
import { PlanetTooltip } from '../ui/PlanetTooltip'
import { ANIMATION } from '../../config/animation'

interface PlanetProps {
  planet: PlanetType
  children?: React.ReactNode
}

export function Planet({ planet, children }: PlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const texture = useCachedTexture(planet.texture)
  const ringTexture = useCachedTexture(planet.ringTexture)

  const activeSection = useAppStore((state) => state.activeSection)
  const setActiveSection = useAppStore((state) => state.setActiveSection)
  const isTransitioning = useAppStore((state) => state.isTransitioning)

  const angleRef = useRef(planet.initialAngle)
  const scaleRef = useRef(1)

  const isOverview = activeSection === 'overview'

  useEffect(() => {
    const x = Math.cos(planet.initialAngle) * planet.distance
    const z = Math.sin(planet.initialAngle) * planet.distance
    planetPositions.setPosition(planet.id, { angle: planet.initialAngle, x, z })
  }, [planet.id, planet.initialAngle, planet.distance])

  useFrame((_, delta) => {
    if (!groupRef.current || !meshRef.current) return

    const state = useAppStore.getState()
    const currentSection = state.activeSection
    const isPaused = state.isPaused
    const isActive = currentSection === planet.id
    const isOverview = currentSection === 'overview'

    if (!isPaused && (isOverview || !isActive)) {
      const orbitSpeed = state.useKeplerOrbits
        ? ANIMATION.KEPLER_ORBIT_K / Math.sqrt(planet.distance)
        : planet.orbitSpeed
      angleRef.current += delta * orbitSpeed * ANIMATION.ORBIT_SPEED_MULTIPLIER
    }

    const x = Math.cos(angleRef.current) * planet.distance
    const z = Math.sin(angleRef.current) * planet.distance

    groupRef.current.position.x = x
    groupRef.current.position.z = z

    planetPositions.setPosition(planet.id, { angle: angleRef.current, x, z })

    if (!isPaused) {
      meshRef.current.rotation.y += delta * planet.rotationSpeed
    }

    const targetScale = hovered && isOverview ? ANIMATION.HOVER_SCALE : 1
    scaleRef.current = MathUtils.lerp(scaleRef.current, targetScale, delta * ANIMATION.HOVER_LERP_SPEED)
    meshRef.current.scale.setScalar(scaleRef.current)
  })

  const handleClick = () => {
    if (isTransitioning) return
    if (isOverview) {
      setActiveSection(planet.id)
    }
  }

  const ringComponent = useMemo(() => {
    if (!planet.hasRings) return null
    return (
      <Ring
        args={[planet.size * 1.4, planet.size * 2.2, 64]}
        rotation={[Math.PI / 2.5, 0, 0]}
      >
        {ringTexture ? (
          <meshBasicMaterial
            map={ringTexture}
            transparent
            opacity={0.85}
            side={DoubleSide}
            depthWrite={false}
          />
        ) : (
          <meshBasicMaterial
            color="#d4c4a8"
            transparent
            opacity={0.7}
            side={DoubleSide}
          />
        )}
      </Ring>
    )
  }, [planet.hasRings, planet.size, ringTexture])

  return (
    <group ref={groupRef}>
      <Sphere
        ref={meshRef}
        args={[planet.size, 64, 64]}
        onClick={handleClick}
        onPointerEnter={() => {
          setHovered(true)
          document.body.style.cursor = isOverview ? 'pointer' : 'default'
        }}
        onPointerLeave={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <meshBasicMaterial
          key={texture ? 'textured' : 'color'}
          map={texture}
          color={texture ? undefined : planet.color}
          toneMapped={false}
        />
      </Sphere>

      {ringComponent}

      {hovered && isOverview && (
        <Html
          position={[0, planet.size + 0.8, 0]}
          center
          style={{ pointerEvents: 'none' }}
          zIndexRange={[100, 0]}
        >
          <PlanetTooltip 
            sectionId={planet.id}
            label={planet.label}
            keyNumber={SECTIONS_ORDER.indexOf(planet.id) + 1}
          />
        </Html>
      )}

      {children}
    </group>
  )
}
