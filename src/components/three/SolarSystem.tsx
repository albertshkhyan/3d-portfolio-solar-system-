import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'
import { StarField } from './StarField'
import { CameraController } from './CameraController'
import { Moon } from './Moon'
import { Asteroid } from './Asteroid'
import { PLANETS, PROJECTS, SKILLS } from '../../data/portfolio'
import { CAMERA } from '../../config/animation'

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
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          position: [...CAMERA.OVERVIEW_POSITION],
          fov: CAMERA.FOV,
          near: CAMERA.NEAR,
          far: CAMERA.FAR,
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 50, 150]} />
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
