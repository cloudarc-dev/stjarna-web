"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface HeroTextProps {
  children: string
  className?: string
  delay?: number
}

export function HeroText({ children, className = "", delay = 0 }: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <h1 className={className}>{children}</h1>
  }

  const words = children.split(" ")

  return (
    <h1 ref={ref} className={`${className} overflow-hidden`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4 last:mr-0">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block origin-bottom"
              initial={{
                opacity: 0,
                y: 100,
                rotateX: -90,
                scale: 0.5
              }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1
              } : {}}
              transition={{
                duration: 0.8,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 }
              }}
              whileHover={{
                scale: 1.2,
                y: -10,
                color: "hsl(var(--primary))",
                textShadow: "0 0 20px hsl(var(--primary) / 0.5)",
                transition: {
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300
                }
              }}
              style={{
                display: "inline-block",
                transformStyle: "preserve-3d",
                cursor: "default",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)"
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  )
}

// Variant with gradient reveal effect
export function HeroTextGradient({ children, className = "", delay = 0 }: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <h1 className={className}>{children}</h1>
  }

  return (
    <h1 ref={ref} className={`${className} relative overflow-hidden`}>
      <motion.span
        className="block"
        initial={{
          backgroundPosition: "0% 50%",
          backgroundSize: "200% 200%"
        }}
        animate={isInView ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{
          duration: 3,
          delay: delay,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          backgroundImage: "linear-gradient(90deg, currentColor 0%, hsl(var(--primary)) 25%, currentColor 50%, hsl(var(--primary)) 75%, currentColor 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%"
        }}
      >
        <motion.span
          className="block"
          initial={{
            opacity: 0,
            y: 100,
            scale: 0.8,
            filter: "blur(10px)"
          }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          } : {}}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {children}
        </motion.span>
      </motion.span>
    </h1>
  )
}

// Variant with glitch effect
export function HeroTextGlitch({ children, className = "", delay = 0 }: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <h1 className={className}>{children}</h1>
  }

  return (
    <h1 ref={ref} className={`${className} relative`}>
      {/* Main text */}
      <motion.span
        className="block relative z-10"
        initial={{
          opacity: 0,
          y: 50,
          filter: "blur(20px)"
        }}
        animate={isInView ? {
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        } : {}}
        transition={{
          duration: 1,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.span>

      {/* Glitch layers */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.7, 0],
            x: [0, i === 0 ? -4 : 4, 0],
            y: [0, i === 0 ? 2 : -2, 0],
          } : {}}
          transition={{
            duration: 0.3,
            delay: delay + 0.8 + (i * 0.1),
            ease: "easeInOut"
          }}
          style={{
            color: i === 0 ? "#00ffff" : "#ff00ff",
            mixBlendMode: "screen"
          }}
        >
          {children}
        </motion.span>
      ))}
    </h1>
  )
}

// Variant with liquid morphing effect
export function HeroTextLiquid({ children, className = "", delay = 0 }: HeroTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <h1 className={className}>{children}</h1>
  }

  const chars = children.split("")

  return (
    <h1 ref={ref} className={`${className} overflow-hidden`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{
            opacity: 0,
            y: 50,
            scaleY: 0,
            filter: "blur(10px)"
          }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            scaleY: 1,
            filter: "blur(0px)"
          } : {}}
          transition={{
            duration: 0.8,
            delay: delay + (i * 0.02),
            ease: [0.43, 0.13, 0.23, 0.96],
            scaleY: {
              type: "spring",
              stiffness: 200,
              damping: 10
            }
          }}
          whileHover={{
            scaleY: [1, 1.3, 0.8, 1.1, 1],
            transition: {
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
          style={{
            display: char === " " ? "inline" : "inline-block",
            transformOrigin: "bottom"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  )
}
