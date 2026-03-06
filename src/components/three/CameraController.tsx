import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Vector3 } from 'three'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { planetPositions } from '../../store/usePlanetPositions'
import { PLANETS } from '../../data/portfolio'
import { ANIMATION, CAMERA } from '../../config/animation'

const OVERVIEW_POSITION = new Vector3(...CAMERA.OVERVIEW_POSITION)
const OVERVIEW_TARGET = new Vector3(...CAMERA.OVERVIEW_TARGET)

export function CameraController() {
  const controlsRef = useRef<OrbitControlsType>(null)
  const { camera } = useThree()
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const isFreeCamera = usePortfolioStore((state) => state.isFreeCamera)
  
  const targetCamPos = useRef(OVERVIEW_POSITION.clone())
  const targetLookAt = useRef(OVERVIEW_TARGET.clone())
  const currentLookAt = useRef(OVERVIEW_TARGET.clone())
  const prevSection = useRef(activeSection)

  const isOverview = activeSection === 'overview'
  const controlsEnabled = isOverview || isFreeCamera

  useFrame(() => {
    const state = usePortfolioStore.getState()
    const currentSection = state.activeSection
    const currentIsFreeCamera = state.isFreeCamera
    const currentIsOverview = currentSection === 'overview'

    if (prevSection.current !== currentSection) {
      if (currentIsOverview) {
        targetCamPos.current.copy(OVERVIEW_POSITION)
        targetLookAt.current.copy(OVERVIEW_TARGET)
      } else {
        const planet = PLANETS.find((p) => p.id === currentSection)
        if (planet) {
          const position = planetPositions.getPosition(currentSection)
          const x = position?.x ?? Math.cos(planet.initialAngle) * planet.distance
          const z = position?.z ?? Math.sin(planet.initialAngle) * planet.distance
          
          const [offsetX, offsetY, offsetZ] = planet.cameraOffset
          
          targetCamPos.current.set(x + offsetX, offsetY, z + offsetZ)
          targetLookAt.current.set(x, 0, z)
        }
      }
      prevSection.current = currentSection
    }

    if (!currentIsFreeCamera) {
      camera.position.lerp(targetCamPos.current, ANIMATION.LERP_FACTOR)
      currentLookAt.current.lerp(targetLookAt.current, ANIMATION.LERP_FACTOR)
      camera.lookAt(currentLookAt.current)
    }

    if (controlsRef.current && (currentIsOverview || currentIsFreeCamera)) {
      controlsRef.current.target.copy(currentLookAt.current)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={controlsEnabled}
      enablePan={isFreeCamera}
      enableZoom={controlsEnabled}
      enableRotate={controlsEnabled}
      minDistance={CAMERA.MIN_DISTANCE}
      maxDistance={CAMERA.MAX_DISTANCE}
      minPolarAngle={CAMERA.MIN_POLAR_ANGLE}
      maxPolarAngle={CAMERA.MAX_POLAR_ANGLE}
      dampingFactor={CAMERA.DAMPING_FACTOR}
      enableDamping
    />
  )
}
