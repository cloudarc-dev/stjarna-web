"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          scale: 0.98,
          filter: "blur(10px)"
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)"
        }}
        exit={{
          opacity: 0,
          scale: 1.02,
          filter: "blur(10px)"
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Curtain wipe transition
export function CurtainTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Top curtain */}
        <motion.div
          className="fixed inset-x-0 top-0 h-1/2 bg-primary z-50 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        />

        {/* Bottom curtain */}
        <motion.div
          className="fixed inset-x-0 bottom-0 h-1/2 bg-primary z-50 origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
          }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Diagonal slide transition
export function DiagonalSlideTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Diagonal overlay */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 z-50"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
          animate={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
          }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
