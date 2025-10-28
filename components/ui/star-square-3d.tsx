"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

// The Star (Innovation)
function Star({ position, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
  })

  // Create star shape
  const starShape = new THREE.Shape()
  const outerRadius = 1
  const innerRadius = 0.4
  const points = 5

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / points
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    if (i === 0) {
      starShape.moveTo(x, y)
    } else {
      starShape.lineTo(x, y)
    }
  }
  starShape.closePath()

  const extrudeSettings = {
    steps: 2,
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelSegments: 3
  }

  return (
    <mesh ref={meshRef} position={position}>
      <extrudeGeometry args={[starShape, extrudeSettings]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// The Squares (Services)
function ServiceSquare({ position, color, rotationSpeed }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef({ angle: Math.random() * Math.PI * 2 })

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    // Orbit around center
    orbitRef.current.angle += rotationSpeed
    meshRef.current.position.x = position[0] + Math.cos(orbitRef.current.angle) * 2
    meshRef.current.position.z = position[2] + Math.sin(orbitRef.current.angle) * 2

    // Rotate the square itself
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Connecting Lines (Network)
function ConnectionLines() {
  return (
    <>
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(angle) * 2, 0, Math.sin(angle) * 2)
        ]
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={i} geometry={lineGeometry}>
            <lineBasicMaterial color="#fedb00" opacity={0.3} transparent />
          </line>
        )
      })}
    </>
  )
}

function Scene() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} intensity={1} color="#fedb00" />

      {/* The Star (Center) */}
      <Star position={[0, 0, 0]} color="#fedb00" />

      {/* The Three Service Squares */}
      <ServiceSquare position={[2, 0, 0]} color="#3b82f6" rotationSpeed={0.005} /> {/* IT - Blue */}
      <ServiceSquare position={[-1, 0, 1.7]} color="#22c55e" rotationSpeed={0.006} /> {/* Fordon - Green */}
      <ServiceSquare position={[-1, 0, -1.7]} color="#a855f7" rotationSpeed={0.004} /> {/* Komm - Purple */}

      {/* Connection Lines */}
      <ConnectionLines />
    </>
  )
}

export function StarSquare3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
