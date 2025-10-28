"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PaintableTextProps {
  text: string
  className?: string
  paintColor?: string
  el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
}

export function PaintableText({
  text,
  className = "",
  paintColor = "#fedb00",
  el: Wrapper = "h1"
}: PaintableTextProps) {
  const [paintedChars, setPaintedChars] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent, wordIndex: number, charIndex: number) => {
    const key = `${wordIndex}-${charIndex}`
    setPaintedChars(prev => new Set(prev).add(key))
  }

  const resetPaint = () => {
    setPaintedChars(new Set())
  }

  const words = text.split(" ")

  return (
    <Wrapper
      className={cn("relative cursor-crosshair select-none", className)}
      ref={containerRef}
      onMouseLeave={resetPaint}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] relative">
          {word.split("").map((char, charIndex) => {
            const key = `${wordIndex}-${charIndex}`
            const isPainted = paintedChars.has(key)

            return (
              <motion.span
                key={charIndex}
                className="inline-block relative"
                onMouseEnter={(e) => handleMouseMove(e, wordIndex, charIndex)}
                style={{
                  position: "relative",
                  display: "inline-block"
                }}
              >
                {/* Original character (hidden when painted) */}
                <motion.span
                  className="inline-block"
                  animate={{
                    opacity: isPainted ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>

                {/* Painted character overlay */}
                <motion.span
                  className="absolute inset-0 inline-block"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(4px)"
                  }}
                  animate={{
                    opacity: isPainted ? 1 : 0,
                    scale: isPainted ? 1 : 0.8,
                    filter: isPainted ? "blur(0px)" : "blur(4px)"
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
                  }}
                  style={{
                    color: paintColor,
                    textShadow: `0 0 20px ${paintColor}80, 0 0 40px ${paintColor}40`
                  }}
                >
                  {char}
                </motion.span>

                {/* Paint splash effect */}
                {isPainted && (
                  <motion.span
                    className="absolute inset-0 -z-10"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5, 1.2],
                      opacity: [0.8, 0.4, 0]
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    style={{
                      background: `radial-gradient(circle, ${paintColor}60 0%, ${paintColor}20 50%, transparent 70%)`,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Wrapper>
  )
}

// Advanced version with brush stroke effect
export function PaintableTextBrush({
  text,
  className = "",
  paintColor = "#fedb00",
  el: Wrapper = "h1"
}: PaintableTextProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [paintedChars, setPaintedChars] = useState<Map<string, { x: number, y: number }>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent, wordIndex: number, charIndex: number) => {
    const key = `${wordIndex}-${charIndex}`
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPaintedChars(prev => {
      const newMap = new Map(prev)
      newMap.set(key, { x, y })
      return newMap
    })
  }

  const resetPaint = () => {
    setPaintedChars(new Map())
  }

  const words = text.split(" ")

  return (
    <Wrapper
      className={cn("relative cursor-crosshair select-none", className)}
      ref={containerRef}
      onMouseLeave={resetPaint}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] relative">
          {word.split("").map((char, charIndex) => {
            const key = `${wordIndex}-${charIndex}`
            const paintData = paintedChars.get(key)
            const isPainted = !!paintData

            return (
              <motion.span
                key={charIndex}
                className="inline-block relative overflow-visible"
                onMouseEnter={(e) => handleMouseMove(e, wordIndex, charIndex)}
              >
                {/* Original character */}
                <motion.span
                  className="inline-block"
                  animate={{
                    opacity: isPainted ? 0 : 1,
                    filter: isPainted ? "blur(2px)" : "blur(0px)"
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  {char}
                </motion.span>

                {/* Painted character with brush effect */}
                <motion.span
                  className="absolute top-0 left-0 inline-block"
                  initial={{
                    opacity: 0,
                    y: -10,
                    scaleY: 0.5
                  }}
                  animate={{
                    opacity: isPainted ? 1 : 0,
                    y: isPainted ? 0 : -10,
                    scaleY: isPainted ? 1 : 0.5
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    color: paintColor,
                    textShadow: `0 2px 8px ${paintColor}60, 0 0 20px ${paintColor}40`,
                    transformOrigin: "top center"
                  }}
                >
                  {char}
                </motion.span>

                {/* Drip effect */}
                {isPainted && (
                  <motion.div
                    className="absolute top-full left-1/2 w-1 -ml-0.5"
                    initial={{ height: 0, opacity: 0.8 }}
                    animate={{
                      height: [0, 20, 15],
                      opacity: [0.8, 0.6, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                      delay: 0.1
                    }}
                    style={{
                      background: `linear-gradient(to bottom, ${paintColor}, transparent)`,
                    }}
                  />
                )}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Wrapper>
  )
}
