"use client"

import { useRef, PropsWithChildren } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { useState, useEffect } from "react"

interface ParallaxScrollProps {
  /**
   * Hur långt (i pixlar) innehållet ska förflyttas vertikalt medan sektionen scrollas.
   * Positiva värden innebär att innehållet rör sig nedåt.
   * Default: 80
   */
  distance?: number
  /** Ytterligare Tailwind-klasser */
  className?: string
}

/**
 * Komponent som ger ett subtilt parallax-scroll-beteende till sitt barn.
 * Den mäter scroll-progress för sitt element och transformerar `translateY` linjärt.
 */
export function ParallaxScroll({
  children,
  distance = 80,
  className,
}: PropsWithChildren<ParallaxScrollProps>) {
  const ref = useRef<HTMLDivElement>(null)

  // scrollYProgress går från 0 (toppen av viewport) till 1 (botten av viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // endast desktop (min-width 1024px)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? distance : 0])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
