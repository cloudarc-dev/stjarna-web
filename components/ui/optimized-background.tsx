"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

interface OptimizedBackgroundProps {
  variant?: "hero" | "subtle" | "minimal"
  className?: string
}

export function OptimizedBackground({ variant = "subtle", className = "" }: OptimizedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isClient, setIsClient] = useState(false)

  // Performance detection
  const performanceLevel = useMemo(() => {
    if (typeof window === "undefined") return "low"

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return "minimal"

    // Basic device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    return isMobile ? "medium" : "high"
  }, [])

  useEffect(() => {
    setIsClient(true)

    // Only track mouse on hero variant with high performance
    if (variant !== "hero" || performanceLevel === "minimal") return

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle updates for better performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [variant, performanceLevel])

  if (!isClient) return null

  // Particle count based on variant and performance
  const particleCount = useMemo(() => {
    if (performanceLevel === "minimal") return 0
    if (variant === "hero") return performanceLevel === "high" ? 20 : 10
    if (variant === "subtle") return performanceLevel === "high" ? 8 : 4
    return 0
  }, [variant, performanceLevel])

  // Render modes
  const renderMinimal = variant === "minimal" || performanceLevel === "minimal"
  const renderSubtle = variant === "subtle"
  const renderHero = variant === "hero"

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient - always rendered, cheapest effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 80% at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.1), transparent 50%)`
        }}
      />

      {/* Subtle grid overlay - only for hero and subtle */}
      {!renderMinimal && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      )}

      {/* Animated gradient orb - hero only */}
      {renderHero && performanceLevel !== "minimal" && (
        <motion.div
          className="absolute -inset-10 opacity-20"
          animate={{
            background: [
              `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 50%)`,
              `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.1), transparent 50%)`,
              `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 50%)`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Floating particles - scaled by performance */}
      {particleCount > 0 && Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Rotating rings - hero only, high performance */}
      {renderHero && performanceLevel === "high" && (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute w-96 h-96 rounded-full border border-primary/10"
              style={{
                left: `${30 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </>
      )}

      {/* Subtle noise texture - hero and subtle only */}
      {!renderMinimal && (
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  )
}
