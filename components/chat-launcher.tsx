"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Sparkles } from "lucide-react"
import { SubtleCard } from "@/components/ui/subtle-card"

export function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle chat interface to show "Coming Soon" message
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Listen for toggleChat event from header
  useEffect(() => {
    const handleToggleChat = () => {
      setIsOpen(prev => !prev)
    }

    window.addEventListener("toggleChat", handleToggleChat)
    return () => window.removeEventListener("toggleChat", handleToggleChat)
  }, [])

  return (
    <>
      {/* Chat interface overlay - Coming Soon */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={toggleChat}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtleCard className="p-6 bg-background border-2 border-border">
                {/* Close Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Stäng"
                >
                  <X size={20} />
                </motion.button>

                {/* Coming Soon Content */}
                <div className="flex flex-col items-center text-center pt-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4"
                  >
                    <Sparkles size={32} className="text-primary-foreground" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold mb-3 text-foreground"
                  >
                    AI-chatten kommer snart
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted-foreground mb-6"
                  >
                    Vi utvecklar just nu en AI-driven chattfunktion för snabbare svar och bättre support.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-muted/50 rounded-lg p-4"
                  >
                    <p className="text-sm font-semibold mb-3 text-foreground">
                      Behöver du hjälp nu?
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        Ring: <a href="tel:+4690704470" className="text-primary hover:underline font-medium">090-70 44 70</a>
                      </p>
                      <p>
                        Eller besök vår <a href="/kontakt" onClick={toggleChat} className="text-primary hover:underline font-medium">kontaktsida</a>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </SubtleCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
