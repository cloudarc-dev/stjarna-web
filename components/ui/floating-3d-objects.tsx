"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

// Lightweight floating geometric shape
function FloatingShape({ position, geometry, color, speed, scale }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offsetRef = useRef(Math.random() * Math.PI * 2)

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime() * speed

    // Smooth floating motion
    meshRef.current.position.y = position[1] + Math.sin(time + offsetRef.current) * 0.5
    meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + offsetRef.current) * 0.3

    // Gentle rotation
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.004
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  )
}

// Scene with multiple shapes
function Scene() {
  const shapes = useMemo(() => [
    {
      position: [-2, 0, -2],
      geometry: <boxGeometry args={[0.8, 0.8, 0.8]} />,
      color: "#ea580c", // orange-600
      speed: 0.5,
      scale: 1,
    },
    {
      position: [2, -1, -3],
      geometry: <octahedronGeometry args={[0.6]} />,
      color: "#f97316", // orange-500
      speed: 0.7,
      scale: 1,
    },
    {
      position: [0, 1, -4],
      geometry: <torusGeometry args={[0.5, 0.2, 16, 32]} />,
      color: "#fb923c", // orange-400
      speed: 0.4,
      scale: 1,
    },
    {
      position: [-1.5, -2, -2.5],
      geometry: <icosahedronGeometry args={[0.5]} />,
      color: "#ea580c",
      speed: 0.6,
      scale: 1,
    },
    {
      position: [1.5, 2, -5],
      geometry: <dodecahedronGeometry args={[0.4]} />,
      color: "#f97316",
      speed: 0.55,
      scale: 1,
    },
  ], [])

  return (
    <>
      {/* Ambient light for soft overall illumination */}
      <ambientLight intensity={0.5} />

      {/* Directional light for depth */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Render shapes */}
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </>
  )
}

export function Floating3DObjects() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Enable performance monitoring
      >
        <Scene />
      </Canvas>
    </div>
  )
}
