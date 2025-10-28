"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"

function GoldenCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, camera } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime()

    // Subtle floating motion (tung, mystisk rörelse)
    const floatY = Math.sin(time * 0.5) * 0.3

    // React to mouse with weight (smooth, heavy feeling)
    targetPosition.current.x = mouse.x * 1.5
    targetPosition.current.y = mouse.y * 1 + floatY

    // Smooth lerp for heavy weight feeling
    meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * 0.02

    // Subtle rotation based on mouse (excellent control)
    targetRotation.current.y = mouse.x * 0.5
    targetRotation.current.x = mouse.y * 0.3

    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05

    // Very slow continuous rotation for mystique
    meshRef.current.rotation.z = time * 0.1

    // Pulsating glow effect
    const pulse = Math.sin(time * 0.8) * 0.3 + 0.7
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = pulse * 0.6
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#fedb00"
        metalness={0.9}
        roughness={0.1}
        emissive="#fedb00"
        emissiveIntensity={0.5}
        envMapIntensity={1.5}
      />

      {/* Subtle wireframe overlay for mystique */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
      </lineSegments>
    </mesh>
  )
}

// Ambient particles in darkness (very subtle)
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 50

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02
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
        size={0.03}
        color="#fedb00"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      {/* Dramatic spotlight on the cube */}
      <ambientLight intensity={0.1} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#fedb00"
        castShadow
      />
      <spotLight
        position={[-5, -3, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#fedb00"
      />

      {/* Rim light for mystique */}
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#ffffff" />

      <GoldenCube />
      <AmbientParticles />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#000000", 5, 15]} />
    </>
  )
}

export function MysticalGoldenCube() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
