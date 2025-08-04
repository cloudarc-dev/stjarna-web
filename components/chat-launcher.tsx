"use client"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, X, Zap, Brain, Headphones, FileText, Send, Bot, User, ArrowRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SubtleCard } from "@/components/ui/subtle-card"
import { Input } from "@/components/ui/input"

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

const launcherActions: QuickAction[] = [
  { icon: Zap, label: "IT-Support", query: "Jag behöver hjälp med IT-problem", color: "from-blue-500 to-blue-600" },
  { icon: Brain, label: "Fordonsteknik", query: "Berätta om era fordonsteknik-lösningar", color: "from-green-500 to-green-600" },
  { icon: Headphones, label: "Kommunikation", query: "Vilka kommunikationslösningar erbjuder ni?", color: "from-purple-500 to-purple-600" },
  { icon: FileText, label: "Offert", query: "Jag vill ha en offert för mina behov", color: "from-orange-500 to-orange-600" },
]

export function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hej! Jag är StjärnaFyrkant AI-assistenten. Hur kan jag hjälpa dig idag?",
      timestamp: new Date(),
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleToggleChat = () => {
      setIsOpen(!isOpen)
      setShowActions(false)
      if (!isOpen) {
        setUnreadCount(0)
      }
    }

    window.addEventListener("toggleChat", handleToggleChat)
    return () => window.removeEventListener("toggleChat", handleToggleChat)
  }, [isOpen])

  // Toggle chat interface
  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowActions(false)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  // Toggle quick actions
  const toggleActions = () => {
    setShowActions(!showActions)
  }

  // Handle quick action selection
  const handleQuickAction = (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsOpen(true)
    setShowActions(false)
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Tack för din förfrågan! Vi återkommer till dig så snart som möjligt.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  // Handle sending a message
  const handleSend = async () => {
    if (inputValue.trim() && !isProcessing) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, userMessage])
      setInputValue("")
      setIsProcessing(true)
      
      try {
        // Call our API route which uses Mistral AI
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(msg => ({
              role: msg.role,
              content: msg.content,
            })),
            context: "general",
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response from AI')
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
      } catch (error) {
        console.error('Error:', error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Tyvärr kunde jag inte bearbeta ditt meddelande just nu. Försök igen senare.",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsProcessing(false)
      }
    }
  }

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Close actions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showActions) {
        setShowActions(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showActions])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  return (
    <>
      {/* Launcher button removed as per new design requirements */}

      {/* Quick actions panel */}
      <AnimatePresence>
        {showActions && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-20 right-4 lg:bottom-24 lg:right-6 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <SubtleCard className="p-3 shadow-xl">
              <div className="grid grid-cols-2 gap-2 w-64">
                {launcherActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.query)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br ${action.color} text-white hover:opacity-90 transition-opacity`}
                    >
                      <Icon size={20} className="mb-2" />
                      <span className="text-xs font-medium">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </SubtleCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat interface overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={toggleChat}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 md:bottom-4 lg:bottom-8 md:right-4 lg:right-8 md:top-auto md:left-auto w-full md:w-auto md:h-[600px] lg:h-[700px] md:max-w-lg lg:max-w-xl xl:w-[480px] z-50 overscroll-none"
              onClick={(e) => e.stopPropagation()}
            >
              <SubtleCard className="p-4 md:p-6 h-full flex flex-col">
                {/* Header */}
                <div className="p-3 md:p-5 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <MessageCircle size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">StjärnaFyrkant AI</h3>
                      <p className="text-sm text-muted-foreground">Online och redo att hjälpa</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">LIVE</Badge>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMessages([
                        {
                          id: "1",
                          role: "assistant",
                          content: "Hej! Jag är StjärnaFyrkant AI-assistenten. Hur kan jag hjälpa dig idag?",
                          timestamp: new Date(),
                        },
                      ])}
                      className="p-1 rounded-full hover:bg-muted"
                      aria-label="Starta om chatten"
                    >
                      <RefreshCw size={20} />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleChat}
                      className="p-1 rounded-full hover:bg-muted"
                      aria-label="Stäng chatt"
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                {/* Messages container */}
                <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {message.role === "user" ? (
                          <User size={16} className="text-primary" />
                        ) : (
                          <Bot size={16} className="text-primary" />
                        )}
                      </div>
                      
                      {/* Message bubble */}
                      <div 
                        className={`rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none"}`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 md:px-6 md:py-4 border-t border-border/20">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {launcherActions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <SubtleCard 
                          key={index}
                          className="flex-shrink-0 p-3 cursor-pointer hover:bg-muted/50 transition-colors min-w-[120px]"
                          onClick={() => handleQuickAction(action.query)}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-center">{action.label}</span>
                          </div>
                        </SubtleCard>
                      )
                    })}
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 md:p-6 border-t border-border/20">
                  <div className="flex gap-3">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Skriv ditt meddelande..."
                      className="flex-grow"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={isProcessing ? toggleChat : handleSend}
                      disabled={!inputValue.trim() && !isProcessing}
                      className={`min-w-10 min-h-10 w-10 h-10 rounded-full ${isProcessing ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                      aria-label={isProcessing ? "Stoppa chatt" : "Skicka meddelande"}
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.div
                            key="stop-icon"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X size={16} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send-icon"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </SubtleCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
