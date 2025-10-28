"use client"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react" // Import JSX to declare the variable

interface AnimatedTextProps {
  children?: React.ReactNode
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
  animationType?: "standard" | "soft"
}

export function AnimatedText({ text, el: Wrapper = "p", className, children, animationType = "standard" }: AnimatedTextProps) {
  const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
  const isHeading = headingTags.includes(Wrapper as typeof headingTags[number])
  const gradientClass = isHeading && Wrapper !== "h1" && Wrapper !== "h2"
    ? "bg-gradient-to-b from-primary via-primary/80 to-primary/60 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]"
    : ""

  const defaultWeight = Wrapper === "h1" ? "font-bold" : ""

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.05 * i },
    }),
  }

  // Standard animation variants (more pronounced)
  const childStandard: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Soft animation variants (gentler)
  const childSoft: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
      },
    },
  }

  const child = animationType === "soft" ? childSoft : childStandard

  return (
    <Wrapper className={cn("font-display", defaultWeight, gradientClass, className)}>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label={text}
        className="block overflow-hidden py-2"
      >
        {text.split(" ").map((word, index) => (
          <span key={index} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <motion.span key={charIndex} className="inline-block pb-2" variants={child}>
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    {children && <span className="ml-2 inline-block">{children}</span>}
    </Wrapper>
  )
}
