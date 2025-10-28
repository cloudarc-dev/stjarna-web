"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SplitTextAnimationProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  type?: "words" | "chars"
}

export function SplitTextAnimation({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  type = "chars"
}: SplitTextAnimationProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className={className}>{text}</div>

  const words = text.split(" ")

  if (type === "words") {
    return (
      <div className={`${className} inline-flex flex-wrap gap-x-2`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ display: "inline-block", transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    )
  }

  // Character-based animation with magnetic effect
  const chars = text.split("")

  return (
    <div className={className} style={{ display: "inline-block" }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1]
          }}
          whileHover={{
            scale: 1.3,
            y: -5,
            color: "hsl(var(--primary))",
            transition: { duration: 0.2 }
          }}
          style={{
            display: char === " " ? "inline" : "inline-block",
            cursor: "default"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}
