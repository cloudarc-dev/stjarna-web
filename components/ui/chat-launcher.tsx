"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, X, Zap, Brain, Headphones, FileText } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

const launcherActions = [
  { icon: Zap, label: "IT-Support", query: "Jag behöver hjälp med IT-problem", color: "from-blue-500 to-blue-600" },
  { icon: Brain, label: "Fordonsteknik", query: "Berätta om era fordonsteknik-lösningar", color: "from-green-500 to-green-600" },
  { icon: Headphones, label: "Kommunikation", query: "Vilka kommunikationslösningar erbjuder ni?", color: "from-purple-500 to-purple-600" },
  { icon: FileText, label: "Offert", query: "Jag vill ha en offert för mina behov", color: "from-orange-500 to-orange-600" },
]

export function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowActions(false)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const toggleActions = () => {
    setShowActions(!showActions)
  }

  const handleQuickAction = (query: string) => {
    setIsOpen(true)
    setShowActions(false)
    // In a real implementation, this would send the query to the chat backend
  }

  return (
    <>
      {/* Chat Interface */}
      {/* Chat interface placeholder - using global chat system */}
      {isOpen && (
        <div className="fixed inset-0 md:bottom-4 lg:bottom-6 md:right-4 lg:right-6 md:top-auto md:left-auto w-full h-full md:w-auto md:h-auto md:max-w-md lg:max-w-lg xl:w-96 z-50">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border/20 flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">StjärnaFyrkant AI</h3>
                  <p className="text-xs text-muted-foreground">Redo att hjälpa dig</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={12} className="text-primary" />
                  </div>
                  <div className="rounded-2xl px-3 py-2 bg-muted text-foreground rounded-tl-none">
                    <p className="text-sm">Hej! Jag är din AI-assistent. Hur kan jag hjälpa dig?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border/20 bg-background">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-grow justify-start text-muted-foreground"
                  onClick={toggleActions}
                >
                  Snabbåtgärder...
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.location.href = "/chat"
                  }}
                >
                  Öppna chatt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Menu */}
      <AnimatePresence>
        {showActions && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-4 w-64">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Snabbhjälp</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowActions(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {launcherActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleQuickAction(action.query)}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 border border-transparent hover:border-primary/20 rounded-xl transition-all duration-200 hover:scale-[1.02] group"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-left">{action.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border/30">
                <Button
                  onClick={toggleChat}
                  className="w-full h-9 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Öppna fullständig chat
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Launcher Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          {/* Notification Badge */}
          <AnimatePresence>
            {unreadCount > 0 && !isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 z-10"
              >
                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full border-2 border-background">
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing Ring */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-primary rounded-full"
          />

          {/* Main Button */}
          <motion.button
            onClick={isOpen ? toggleChat : toggleActions}
            onHoverStart={() => {
              if (!isOpen && !showActions) {
                // Preview hover effect
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-gradient-to-br from-primary via-primary to-primary/90 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />

            {/* Icon */}
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                  {/* Sparkle Effect */}
                  <motion.div
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && !showActions && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                transition={{ delay: 2 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
              >
                <p className="text-sm font-medium">Behöver du hjälp?</p>
                <p className="text-xs text-muted-foreground">Klicka för att chatta med AI</p>
                {/* Arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-card/95 border-y-4 border-y-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
