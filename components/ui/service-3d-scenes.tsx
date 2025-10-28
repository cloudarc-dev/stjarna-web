"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

// IT Service: Circuit Board with Data Flow
function CircuitBoard() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.02 // Move along X axis (data flow)
        if (positions[i] > 4) positions[i] = -4 // Reset position
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Create circuit lines
  const lines = []
  for (let i = 0; i < 5; i++) {
    const points = [
      new THREE.Vector3(-4, -2 + i, 0),
      new THREE.Vector3(4, -2 + i, 0)
    ]
    lines.push(new THREE.BufferGeometry().setFromPoints(points))
  }

  // Data flow particles
  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4
    positions[i * 3 + 2] = 0
  }

  return (
    <group ref={groupRef}>
      {/* Circuit lines */}
      {lines.map((geom, i) => (
        <line key={i} geometry={geom}>
          <lineBasicMaterial color="#3b82f6" linewidth={2} />
        </line>
      ))}

      {/* Connection nodes */}
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[(i - 5) * 0.8, (Math.random() - 0.5) * 3, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Data flow particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#60a5fa" transparent opacity={0.8} />
      </points>
    </group>
  )
}

// Fordonsteknik: 3D Vehicle Path
function VehiclePath() {
  const vehicleRef = useRef<THREE.Mesh>(null)
  const pathRef = useRef({ t: 0 })

  useFrame(({ clock }) => {
    if (!vehicleRef.current) return

    // Move vehicle along path
    pathRef.current.t += 0.01
    const t = pathRef.current.t % 1

    // Create curved path
    const radius = 2
    const x = Math.cos(t * Math.PI * 2) * radius
    const z = Math.sin(t * Math.PI * 2) * radius

    vehicleRef.current.position.set(x, 0, z)
    vehicleRef.current.rotation.y = -t * Math.PI * 2 + Math.PI / 2
  })

  // Create road path
  const curvePoints = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    curvePoints.push(new THREE.Vector3(
      Math.cos(angle) * 2,
      0,
      Math.sin(angle) * 2
    ))
  }
  const curve = new THREE.CatmullRomCurve3(curvePoints, true)
  const points = curve.getPoints(100)
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <group>
      {/* Road path */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#22c55e" linewidth={3} />
      </line>

      {/* Vehicle (simplified truck) */}
      <mesh ref={vehicleRef}>
        <boxGeometry args={[0.5, 0.3, 0.8]} />
        <meshStandardMaterial
          color="#22c55e"
          metalness={0.7}
          roughness={0.3}
          emissive="#22c55e"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Path markers */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, -0.2, Math.sin(angle) * 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
        )
      })}
    </group>
  )
}

// Kommunikationsteknik: Signal Waves
function SignalWaves() {
  const wavesRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!wavesRef.current) return
    wavesRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <group ref={wavesRef}>
      {/* Central tower/antenna */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.8}
          roughness={0.2}
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Signal waves (expanding rings) */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5 + i * 0.5, 0.6 + i * 0.5, 32]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.6 - i * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Orbiting signal nodes */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, 0.5, Math.sin(angle) * 2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              metalness={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Main component
export function Service3DScene({ service }: { service: "it" | "fordon" | "kommunikation" }) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {service === "it" && <CircuitBoard />}
        {service === "fordon" && <VehiclePath />}
        {service === "kommunikation" && <SignalWaves />}
      </Canvas>
    </div>
  )
}
