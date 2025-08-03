"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Button } from "@/components/ui/button"

interface UpsalesModalProps {
  open: boolean
  onClose: () => void
}

export const UpsalesModal = ({ open, onClose }: UpsalesModalProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [open, onClose])

  if (!isClient || !open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <SubtleCard className="p-6 rounded-2xl border border-border/40 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Kontakta oss
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="rounded-full p-2 h-auto w-auto"
                  aria-label="Stäng"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border/20">
                <iframe
                  src="https://pages.upsales.com/15928u9ea9c25520b24d16b2bf82ab9f1699a5-frame"
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  title="Kontaktformulär"
                />
              </div>
            </SubtleCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}