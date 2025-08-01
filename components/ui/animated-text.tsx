"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react" // Import JSX to declare the variable

interface AnimatedTextProps {
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
}

export function AnimatedText({ text, el: Wrapper = "p", className }: AnimatedTextProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.05 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <Wrapper className={cn("font-display overflow-hidden", className)}>
      <motion.span variants={container} initial="hidden" animate="visible" aria-label={text}>
        {text.split(" ").map((word, index) => (
          <span key={index} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <motion.span key={charIndex} className="inline-block pb-1" variants={child}>
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
