"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MysticalBackgroundProps {
  variant?: "hero" | "subtle" | "full"
  className?: string
}

export function MysticalBackground({ variant = "hero", className = "" }: MysticalBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!isClient) return null

  const intensity = variant === "full" ? 1 : variant === "hero" ? 0.7 : 0.4

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -inset-10 opacity-30"
        animate={{
          background: [
            `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.15), transparent 50%)`,
            `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.1), transparent 50%)`,
            `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.15), transparent 50%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {Array.from({ length: variant === "full" ? 50 : variant === "hero" ? 30 : 15 }).map((_, i) => (
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
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Mystical grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Luminous waves */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary) / 0.1), transparent)`,
            `conic-gradient(from 180deg at 50% 50%, transparent, hsl(var(--primary) / 0.1), transparent)`,
            `conic-gradient(from 360deg at 50% 50%, transparent, hsl(var(--primary) / 0.1), transparent)`,
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Kinetic energy bursts */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`burst-${i}`}
          className="absolute w-96 h-96 rounded-full border border-primary/10"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
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

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Interactive light beam following mouse */}
      <motion.div
        className="absolute w-1 opacity-20"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: 0,
          height: "100%",
          background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.3), transparent)`,
          transform: "translateX(-50%)",
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute h-1 opacity-20"
        style={{
          top: `${mousePosition.y * 100}%`,
          left: 0,
          width: "100%",
          background: `linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)`,
          transform: "translateY(-50%)",
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
