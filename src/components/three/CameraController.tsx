import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Vector3 } from 'three'
import { useAppStore } from '../../store'
import { planetPositions } from '../../store/usePlanetPositions'
import { PLANETS } from '../../data/portfolio'
import { ANIMATION, CAMERA } from '../../config/animation'

const OVERVIEW_POSITION = new Vector3(...CAMERA.OVERVIEW_POSITION)
const OVERVIEW_TARGET = new Vector3(...CAMERA.OVERVIEW_TARGET)
const _direction = new Vector3()
const _target = new Vector3()
const _sunPos = new Vector3(0, 0, 0)

export function CameraController() {
  const controlsRef = useRef<OrbitControlsType>(null)
  const { camera } = useThree()
  const activeSection = useAppStore((state) => state.activeSection)
  const isFreeCamera = useAppStore((state) => state.isFreeCamera)
  
  const targetCamPos = useRef(OVERVIEW_POSITION.clone())
  const targetLookAt = useRef(OVERVIEW_TARGET.clone())
  const currentLookAt = useRef(OVERVIEW_TARGET.clone())
  const prevSection = useRef(activeSection)
  /** When set, camera smoothly zooms out to this distance (e.g. Milky Way view) */
  const zoomToDistanceRef = useRef<number | null>(null)
  /** When set, camera is lerping back to overview over RESET_ANIMATION_DURATION */
  const resetAnimationRef = useRef<{
    startPos: Vector3
    startLookAt: Vector3
    progress: number
  } | null>(null)

  const isOverview = activeSection === 'overview'
  const controlsEnabled = isOverview || isFreeCamera

  useFrame((_, delta) => {
    const state = useAppStore.getState()
    const currentSection = state.activeSection
    const currentIsFreeCamera = state.isFreeCamera
    const currentIsOverview = currentSection === 'overview'
    const controls = controlsRef.current

    if (state.zoomIntent && controls && (currentIsOverview || currentIsFreeCamera)) {
      _target.copy(controls.target)
      const distance = camera.position.distanceTo(_target)
      const intent = state.zoomIntent
      useAppStore.getState().setZoomIntent(null)

      if (intent === 'reset') {
        zoomToDistanceRef.current = null
        resetAnimationRef.current = {
          startPos: camera.position.clone(),
          startLookAt: currentLookAt.current.clone(),
          progress: 0,
        }
      } else if (intent === 'milky-way') {
        zoomToDistanceRef.current = CAMERA.MILKY_WAY_VIEW_DISTANCE
      } else {
        _direction.copy(camera.position).sub(_target).normalize()
        const factor = intent === 'in' ? 1 / CAMERA.DOLLY_FACTOR : CAMERA.DOLLY_FACTOR
        let newDistance = distance * factor
        newDistance = Math.max(CAMERA.MIN_DISTANCE, Math.min(CAMERA.MAX_DISTANCE, newDistance))
        camera.position.copy(_target).add(_direction.multiplyScalar(newDistance))
        if (currentIsOverview) {
          targetCamPos.current.copy(camera.position)
          targetLookAt.current.copy(_target)
        }
        currentLookAt.current.copy(_target)
        controls.target.copy(_target)
      }
      controls.update()
    }

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

    if (
      zoomToDistanceRef.current != null &&
      controls &&
      (currentIsOverview || currentIsFreeCamera)
    ) {
      _target.copy(controls.target)
      _direction.copy(camera.position).sub(_target).normalize()
      const currentDist = camera.position.distanceTo(_target)
      const targetDist = zoomToDistanceRef.current
      const remaining = Math.max(0, targetDist - currentDist)
      const distanceSpeedFactor = 1 + currentDist / CAMERA.MILKY_WAY_ZOOM_DISTANCE_SCALE
      const easeOut = targetDist > 0
        ? Math.max(0.2, 0.3 + (0.7 * remaining) / targetDist)
        : 1
      const effectiveLerp =
        CAMERA.MILKY_WAY_ZOOM_LERP * distanceSpeedFactor * easeOut
      const newDist =
        currentDist + (targetDist - currentDist) * effectiveLerp
      const clampedDist = Math.min(
        CAMERA.MAX_DISTANCE,
        Math.max(CAMERA.MIN_DISTANCE, newDist)
      )
      if (Math.abs(clampedDist - targetDist) < 1) {
        zoomToDistanceRef.current = null
        camera.position.copy(_target).add(_direction.multiplyScalar(targetDist))
      } else {
        camera.position.copy(_target).add(_direction.multiplyScalar(clampedDist))
      }
      if (currentIsOverview) {
        targetCamPos.current.copy(camera.position)
        targetLookAt.current.copy(_target)
      }
      currentLookAt.current.copy(_target)
      controls.target.copy(_target)
      controls.update()
    }

    const resetAnim = resetAnimationRef.current
    if (resetAnim && controls) {
      const duration = ANIMATION.RESET_ANIMATION_DURATION
      resetAnim.progress = Math.min(1, resetAnim.progress + delta / duration)
      const t = resetAnim.progress
      camera.position.lerpVectors(resetAnim.startPos, OVERVIEW_POSITION, t)
      currentLookAt.current.lerpVectors(resetAnim.startLookAt, OVERVIEW_TARGET, t)
      targetCamPos.current.copy(camera.position)
      targetLookAt.current.copy(currentLookAt.current)
      controls.target.copy(currentLookAt.current)
      controls.update()
      if (t >= 1) {
        camera.position.copy(OVERVIEW_POSITION)
        currentLookAt.current.copy(OVERVIEW_TARGET)
        targetCamPos.current.copy(OVERVIEW_POSITION)
        targetLookAt.current.copy(OVERVIEW_TARGET)
        controls.target.copy(OVERVIEW_TARGET)
        resetAnimationRef.current = null
      }
    }

    if (!currentIsFreeCamera) {
      camera.position.lerp(targetCamPos.current, ANIMATION.LERP_FACTOR)
      currentLookAt.current.lerp(targetLookAt.current, ANIMATION.LERP_FACTOR)
      camera.lookAt(currentLookAt.current)
    }

    if (controls && (currentIsOverview || currentIsFreeCamera)) {
      controls.target.copy(currentLookAt.current)
      controls.update()
    }
    const targetPoint = controlsRef.current?.target ?? currentLookAt.current
    const dist = camera.position.distanceTo(targetPoint)
    useAppStore.getState().setCameraDistance(Math.round(dist * 10) / 10)
    _target.copy(targetPoint)
    _direction.copy(camera.position).sub(_target)
    if (dist > 1e-6) {
      const azimuth = Math.atan2(_direction.x, _direction.z)
      const polar = Math.acos(Math.max(-1, Math.min(1, _direction.y / dist)))
      useAppStore.getState().setCameraSpherical(azimuth, polar)
    }

    _sunPos.set(0, 0, 0)
    _sunPos.project(camera)
    const xPercent = ((_sunPos.x + 1) / 2) * 100
    const yPercent = (1 - _sunPos.y) / 2 * 100
    useAppStore.getState().setSunOverlayPosition({
      x: xPercent,
      y: yPercent,
      visible: _sunPos.z <= 1,
    })
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
