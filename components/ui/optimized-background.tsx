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

  // Particle count based on variant and performance - MUST be before any returns
  const particleCount = useMemo(() => {
    if (performanceLevel === "minimal") return 0
    if (variant === "hero") return performanceLevel === "high" ? 20 : 10
    if (variant === "subtle") return performanceLevel === "high" ? 8 : 4
    return 0
  }, [variant, performanceLevel])

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

      {/* Enhanced shimmering grid overlay - only for hero and subtle */}
      {!renderMinimal && (
        <>
          {/* Main grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.15) 1.5px, transparent 1.5px),
                linear-gradient(90deg, hsl(var(--primary) / 0.15) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Animated shimmer effect on grid */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.2) 2px, transparent 2px),
                linear-gradient(90deg, hsl(var(--primary) / 0.2) 2px, transparent 2px)
              `,
              backgroundSize: "60px 60px",
              maskImage: `radial-gradient(ellipse 60% 60% at ${mousePosition.x}% ${mousePosition.y}%, black, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(ellipse 60% 60% at ${mousePosition.x}% ${mousePosition.y}%, black, transparent 70%)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid intersection glow points */}
          {renderHero && (
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                maskImage: `radial-gradient(ellipse 50% 50% at ${mousePosition.x}% ${mousePosition.y}%, black, transparent 60%)`,
                WebkitMaskImage: `radial-gradient(ellipse 50% 50% at ${mousePosition.x}% ${mousePosition.y}%, black, transparent 60%)`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </>
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

      {/* Realistic lens flare - hero only */}
      {renderHero && performanceLevel !== "minimal" && (
        <>
          {/* Main light source glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, hsl(var(--primary) / 0.12) 30%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Chromatic lens flare artifacts - realistic colors */}
          {/* Purple/Blue artifact */}
          <motion.div
            className="absolute w-32 h-32 rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x + (50 - mousePosition.x) * 0.3}%`,
              top: `${mousePosition.y + (50 - mousePosition.y) * 0.3}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0.05) 50%, transparent 80%)`,
              filter: "blur(20px)",
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Green artifact */}
          <motion.div
            className="absolute w-24 h-24 rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x + (50 - mousePosition.x) * 0.5}%`,
              top: `${mousePosition.y + (50 - mousePosition.y) * 0.5}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(0, 255, 127, 0.15) 0%, rgba(0, 255, 127, 0.03) 50%, transparent 80%)`,
              filter: "blur(15px)",
            }}
            animate={{
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Pink/Magenta artifact */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x + (50 - mousePosition.x) * 0.7}%`,
              top: `${mousePosition.y + (50 - mousePosition.y) * 0.7}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(255, 105, 180, 0.18) 0%, rgba(255, 105, 180, 0.04) 50%, transparent 80%)`,
              filter: "blur(25px)",
            }}
            animate={{
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />

          {/* Subtle orange/amber glow */}
          <motion.div
            className="absolute w-28 h-28 rounded-full pointer-events-none"
            style={{
              left: `${mousePosition.x + (50 - mousePosition.x) * 0.15}%`,
              top: `${mousePosition.y + (50 - mousePosition.y) * 0.15}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(255, 165, 0, 0.15) 0%, rgba(255, 165, 0, 0.03) 50%, transparent 80%)`,
              filter: "blur(18px)",
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
        </>
      )}
    </div>
  )
}
