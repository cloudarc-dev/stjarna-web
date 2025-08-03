"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, X, Zap, Brain, Headphones, FileText, ChevronDown } from "lucide-react"
import { ChatInterface } from "./chat-interface"
import { Button } from "./button"
import { Badge } from "./badge"

// Distinct Chat Iconography - matching UI-kit system
const ItIcon = () => (
  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l3 3 3-3h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
  </svg>
)

const FordonsIcon = () => (
  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
)

const KommunikationIcon = () => (
  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3.5 21.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM1 9l2 2c5.39-5.39 14.61-5.39 20 0l2-2C19.07 3.07 4.93 3.07 1 9zM9 17l2 2c1.1-1.1 2.9-1.1 4 0l2-2c-2.73-2.73-7.27-2.73-10 0z"/>
  </svg>
)

const OffertIcon = () => (
  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
)

const quickActions = [
  { icon: ItIcon, label: "IT-Support", query: "Jag behöver hjälp med IT-problem", color: "from-blue-500 to-blue-600", textColor: "text-blue-600 dark:text-blue-400", hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/20", border: "hover:border-blue-200 dark:hover:border-blue-800/30" },
  { icon: FordonsIcon, label: "Fordonsteknik", query: "Berätta om era fordonsteknik-lösningar", color: "from-green-500 to-green-600", textColor: "text-green-600 dark:text-green-400", hoverBg: "hover:bg-green-50 dark:hover:bg-green-950/20", border: "hover:border-green-200 dark:hover:border-green-800/30" },
  { icon: KommunikationIcon, label: "Kommunikation", query: "Vilka kommunikationslösningar erbjuder ni?", color: "from-purple-500 to-purple-600", textColor: "text-purple-600 dark:text-purple-400", hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-950/20", border: "hover:border-purple-200 dark:hover:border-purple-800/30" },
  { icon: OffertIcon, label: "Offert", query: "Jag vill ha en offert för mina behov", color: "from-orange-500 to-orange-600", textColor: "text-orange-600 dark:text-orange-400", hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950/20", border: "hover:border-orange-200 dark:hover:border-orange-800/30" },
]

export function NavbarChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowDropdown(false)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
    setIsOpen(false)
  }

  const handleQuickAction = (query: string) => {
    setIsOpen(true)
    setShowDropdown(false)
  }

  return (
    <>
      {/* Chat Interface - Responsive positioning */}
      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        context="general"
        quickActions={quickActions.map(action => ({
          label: action.label,
          query: action.query
        }))}
        className="fixed inset-0 md:top-20 lg:top-24 md:right-4 lg:right-6 md:bottom-4 lg:bottom-6 md:left-auto md:w-auto md:h-auto md:max-w-md lg:max-w-lg xl:w-96 z-40"
      />

      {/* Quick Actions Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full right-0 mt-2 w-64 md:w-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">AI-Assistent</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleQuickAction(action.query)}
                    className={`w-full flex items-center gap-3 p-3 bg-gradient-to-r ${action.hoverBg} border border-transparent ${action.border} rounded-lg transition-all duration-200 hover:scale-[1.02] group`}
                  >
                    <div className={`w-6 h-6 bg-gradient-to-br ${action.color} rounded-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon />
                    </div>
                    <span className={`text-sm font-medium text-left ${action.textColor}`}>{action.label}</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="pt-3 border-t border-border/30">
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

      {/* Navbar Button */}
      <div className="relative">
        {/* Notification Badge */}
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 z-10"
            >
              <Badge className="bg-red-500 text-white text-xs px-1 py-0 rounded-full border-2 border-background min-w-[16px] h-4 flex items-center justify-center">
                {unreadCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button Group - Responsive */}
        <div className="flex items-center">
          {/* Chat Button - Responsive sizing */}
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-8 md:h-9 lg:h-10 px-2 md:px-3 lg:px-4 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 hover:border-primary/30 rounded-l-lg transition-all duration-200 flex items-center gap-1 md:gap-2 group"
          >
            <div className="relative">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              {/* Sparkle Effect - Hidden on mobile for performance */}
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
                className="absolute -top-1 -right-1 hidden md:block"
              >
                <Sparkles className="w-2 h-2 text-yellow-500" />
              </motion.div>
            </div>
            <span className="text-xs md:text-sm font-medium text-primary hidden sm:inline">AI Chat</span>
            <span className="text-xs md:text-sm font-medium text-primary sm:hidden">AI</span>
          </motion.button>

          {/* Dropdown Button - Responsive sizing */}
          <motion.button
            onClick={toggleDropdown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-8 md:h-9 lg:h-10 px-1 md:px-2 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-l-0 border border-primary/20 hover:border-primary/30 rounded-r-lg transition-all duration-200 flex items-center"
          >
            <motion.div
              animate={{ rotate: showDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-2 h-2 md:w-3 md:h-3 text-primary" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  )
}
