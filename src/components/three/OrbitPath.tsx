import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import type { Vector3Tuple } from 'three'

interface OrbitPathProps {
  radius: number
  segments?: number
  opacity?: number
}

export function OrbitPath({ radius, segments = 128, opacity = 0.15 }: OrbitPathProps) {
  const points = useMemo(() => {
    const pts: Vector3Tuple[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ])
    }
    return pts
  }, [radius, segments])

  return (
    <Line
      points={points}
      color="#6366f1"
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  )
}
