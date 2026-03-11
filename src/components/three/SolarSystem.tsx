import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'
import { StarField } from './StarField'
import { DistanceFog } from './DistanceFog'
import { CameraController } from './CameraController'
import { Moon } from './Moon'
import { Asteroid } from './Asteroid'
import { PLANETS, PROJECTS, SKILLS } from '../../data/portfolio'
import { CAMERA, FOG } from '../../config/animation'
import { useViewport } from '../../hooks/useViewport'

function Scene() {
  return (
    <>
      <Sun />

      {PLANETS.map((planet) => (
        <group key={planet.id}>
          <OrbitPath radius={planet.distance} />
          <Planet planet={planet}>
            {planet.id === 'projects' &&
              PROJECTS.map((project, index) => (
                <Moon key={project.id} project={project} index={index} />
              ))}
            {planet.id === 'skills' &&
              SKILLS.map((skill, index) => (
                <Asteroid
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={SKILLS.length}
                />
              ))}
          </Planet>
        </group>
      ))}

      <StarField />
      <DistanceFog />
      <CameraController />
    </>
  )
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

export function SolarSystem() {
  const { isMobile } = useViewport()

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [...CAMERA.OVERVIEW_POSITION],
          fov: CAMERA.FOV,
          near: CAMERA.NEAR,
          far: CAMERA.FAR,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', FOG.DENSE_NEAR, FOG.DENSE_FAR]} />
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
