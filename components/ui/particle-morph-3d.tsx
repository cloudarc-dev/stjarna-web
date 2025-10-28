"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function ParticleSystem({ shape = "star" }: { shape?: "star" | "square" | "sphere" }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  // Generate particle positions based on shape
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      if (shape === "star") {
        // Star shape distribution
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 2 + Math.random() * 0.5
        const armAngle = Math.floor(Math.random() * 5) * (Math.PI * 2 / 5)

        pos[i3] = Math.cos(angle + armAngle) * radius
        pos[i3 + 1] = (Math.random() - 0.5) * 0.5
        pos[i3 + 2] = Math.sin(angle + armAngle) * radius
      } else if (shape === "square") {
        // Square shape distribution
        const size = 2
        const edge = Math.floor(Math.random() * 4)
        const t = Math.random()

        if (edge === 0) { // Top
          pos[i3] = (Math.random() - 0.5) * size
          pos[i3 + 1] = size / 2
          pos[i3 + 2] = (Math.random() - 0.5) * size
        } else if (edge === 1) { // Right
          pos[i3] = size / 2
          pos[i3 + 1] = (Math.random() - 0.5) * size
          pos[i3 + 2] = (Math.random() - 0.5) * size
        } else if (edge === 2) { // Bottom
          pos[i3] = (Math.random() - 0.5) * size
          pos[i3 + 1] = -size / 2
          pos[i3 + 2] = (Math.random() - 0.5) * size
        } else { // Left
          pos[i3] = -size / 2
          pos[i3 + 1] = (Math.random() - 0.5) * size
          pos[i3 + 2] = (Math.random() - 0.5) * size
        }
      } else {
        // Sphere distribution
        const radius = 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
        pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        pos[i3 + 2] = radius * Math.cos(phi)
      }
    }

    return pos
  }, [shape, particleCount])

  useFrame(({ clock }) => {
    if (!particlesRef.current) return

    const time = clock.getElapsedTime()
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]

      // Add wave motion
      positions[i3 + 1] = y + Math.sin(time + x * 2) * 0.02
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#fedb00"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene({ shape }: { shape: "star" | "square" | "sphere" }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <ParticleSystem shape={shape} />
    </>
  )
}

export function ParticleMorph3D({ shape = "star" }: { shape?: "star" | "square" | "sphere" }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene shape={shape} />
      </Canvas>
    </div>
  )
}
