"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface PaintableTextBrushProps {
  text: string
  className?: string
  paintColor?: string
  el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
}

// NEXT LEVEL entrance + paintable effect
export function PaintableTextBrushV2({
  text,
  className = "",
  paintColor = "#fedb00",
  el: Wrapper = "h1"
}: PaintableTextBrushProps) {
  const [paintedChars, setPaintedChars] = useState<Map<string, boolean>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const handleMouseMove = (wordIndex: number, charIndex: number) => {
    const key = `${wordIndex}-${charIndex}`
    setPaintedChars(prev => {
      const newMap = new Map(prev)
      newMap.set(key, true)
      return newMap
    })
  }

  const resetPaint = () => {
    setPaintedChars(new Map())
  }

  const words = text.split(" ")

  return (
    <Wrapper
      className={cn("relative cursor-crosshair select-none perspective-1000", className)}
      ref={containerRef}
      onMouseLeave={resetPaint}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] relative">
          {word.split("").map((char, charIndex) => {
            const key = `${wordIndex}-${charIndex}`
            const isPainted = paintedChars.get(key)
            const totalIndex = wordIndex * 10 + charIndex

            return (
              <motion.span
                key={charIndex}
                className="inline-block relative overflow-visible"
                onMouseEnter={() => handleMouseMove(wordIndex, charIndex)}
                // EPIC ENTRANCE ANIMATION
                initial={{
                  opacity: 0,
                  y: 150,
                  rotateX: -90,
                  scale: 0.3,
                  filter: "blur(20px)"
                }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  filter: "blur(0px)"
                } : {}}
                transition={{
                  duration: 1.2,
                  delay: totalIndex * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "bottom center"
                }}
              >
                {/* Original character */}
                <motion.span
                  className="inline-block"
                  animate={{
                    opacity: isPainted ? 0 : 1,
                    filter: isPainted ? "blur(3px)" : "blur(0px)",
                    scale: isPainted ? 0.9 : 1
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>

                {/* Painted character */}
                <motion.span
                  className="absolute top-0 left-0 inline-block pointer-events-none"
                  initial={{
                    opacity: 0,
                    y: -20,
                    scaleY: 0.3
                  }}
                  animate={{
                    opacity: isPainted ? 1 : 0,
                    y: isPainted ? 0 : -20,
                    scaleY: isPainted ? 1 : 0.3
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{
                    color: paintColor,
                    textShadow: `0 2px 12px ${paintColor}80, 0 0 30px ${paintColor}60, 0 0 50px ${paintColor}40`,
                    transformOrigin: "top center"
                  }}
                >
                  {char}
                </motion.span>

                {/* Paint splash effect */}
                {isPainted && (
                  <>
                    {/* Main splash */}
                    <motion.div
                      className="absolute inset-0 -z-10"
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{
                        scale: [0, 2, 1.5],
                        opacity: [0.8, 0.3, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      style={{
                        background: `radial-gradient(circle, ${paintColor}80 0%, ${paintColor}40 40%, transparent 70%)`,
                        borderRadius: "50%",
                      }}
                    />

                    {/* Drip effect */}
                    <motion.div
                      className="absolute top-full left-1/2 w-1 -ml-0.5"
                      initial={{ height: 0, opacity: 0.9 }}
                      animate={{
                        height: [0, 25, 18],
                        opacity: [0.9, 0.5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1
                      }}
                      style={{
                        background: `linear-gradient(to bottom, ${paintColor}, transparent)`,
                        filter: `blur(1px)`
                      }}
                    />
                  </>
                )}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Wrapper>
  )
}
