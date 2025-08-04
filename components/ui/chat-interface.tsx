"use client";

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Zap,
  Brain,
  Headphones,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SubtleCard } from "@/components/ui/subtle-card"

// Types
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type QuickAction = {
  icon: React.ComponentType<any>
  label: string
  query: string
  color: string
}

// Quick actions data
const quickActions: QuickAction[] = [
  { icon: Zap, label: "IT-Support", query: "Jag behöver hjälp med IT-problem", color: "from-blue-500 to-blue-600" },
  { icon: Brain, label: "Fordonsteknik", query: "Berätta om era fordonsteknik-lösningar", color: "from-green-500 to-green-600" },
  { icon: Headphones, label: "Kommunikation", query: "Vilka kommunikationslösningar erbjuder ni?", color: "from-purple-500 to-purple-600" },
  { icon: FileText, label: "Offert", query: "Jag vill ha en offert för mina behov", color: "from-orange-500 to-orange-600" },
]

// Chat window with full functionality
function ChatWindow({ embedded }: { embedded: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hej! Jag är StjärnaFyrkant AI-assistenten. Hur kan jag hjälpa dig idag?",
      timestamp: new Date()
    }
  ])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Handle sending a message
  const handleSend = () => {
    if (inputValue.trim() === "" || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Tack för ditt meddelande! Jag är en demo-AI, så jag kan inte ge dig ett riktigt svar just nu. Men i en riktig implementation skulle jag hjälpa dig med dina behov.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Handle quick action
  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.query)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="p-3 md:p-5 border-b border-border/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">StjärnaFyrkant AI</h3>
            <p className="text-sm text-muted-foreground">Online och redo att hjälpa</p>
          </div>
          <Badge variant="outline" className="ml-auto">LIVE</Badge>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {message.role === "user" ? (
                    <User size={16} className="text-primary" />
                  ) : (
                    <Bot size={16} className="text-primary" />
                  )}
                </div>
                
                {/* Message bubble */}
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none"
                }`}>
                  <p>{message.content}</p>
                  {isClient && (
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      {!embedded && (
        <div className="px-4 py-3 md:px-6 md:py-4 border-t border-border/20">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, index) => (
              <SubtleCard 
                key={index}
                className="flex-shrink-0 p-3 cursor-pointer hover:bg-muted/50 transition-colors min-w-[120px]"
                onClick={() => handleQuickAction(action)}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </div>
              </SubtleCard>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 md:p-6 border-t border-border/20">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Skriv ditt meddelande..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || inputValue.trim() === ""}
            className="px-6"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ChatInterfaceProps {
  embedded?: boolean
  className?: string
  showLauncher?: boolean
}

export function ChatInterface({ embedded = false, className = "", showLauncher = !embedded }: ChatInterfaceProps) {
  const [open, setOpen] = useState(embedded)

  const toggle = () => setOpen((o) => !o)

  // Listen for global toggle events (used by navbar launcher)
  useEffect(() => {
    const handler = () => toggle()
    window.addEventListener("toggleChat", handler)
    return () => window.removeEventListener("toggleChat", handler)
  }, [])

  // Prevent body scroll on mobile when chat is open
  useEffect(() => {
    if (embedded) return
    if (open && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.classList.add("chat-open")
    } else {
      document.body.classList.remove("chat-open")
    }
    return () => {
      document.body.classList.remove("chat-open")
    }
  }, [open, embedded])

  const containerClasses = cn(
    embedded
      ? "w-full"
      : "fixed inset-0 md:bottom-4 lg:bottom-6 md:right-4 lg:right-6 md:top-auto md:left-auto w-full h-full md:w-auto md:h-auto md:max-w-md lg:max-w-lg xl:w-96 z-50 overscroll-none",
    className
  )

  return (
    <>
      {/* Launcher */}
      {!embedded && showLauncher && (
        <motion.button
          onClick={toggle}
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40 p-4 rounded-full bg-primary text-background shadow-xl hover:brightness-110 focus:outline-none"
          aria-label={open ? "Stäng chatt" : "Öppna chatt"}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open-icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={containerClasses}
          >
            <div className="flex flex-col w-full h-full bg-background md:bg-card md:border md:border-border rounded-none md:rounded-xl shadow-none md:shadow-2xl">
              <ChatWindow embedded={embedded} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

