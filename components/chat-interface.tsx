"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Types
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type QuickAction = {
  label: string
  query: string
}

type ChatInterfaceProps = {
  embedded?: boolean
  context?: string
  quickActions?: QuickAction[]
  className?: string
}

export function ChatInterface({ 
  embedded = false, 
  context = "general",
  quickActions = [],
  className = ""
}: ChatInterfaceProps) {
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
  const handleSend = async () => {
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
          context,
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
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Tyvärr kunde jag inte bearbeta ditt meddelande just nu. Försök igen senare.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle quick action
  const handleQuickAction = (query: string) => {
    setInputValue(query)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  {message.role === "user" ? (
                    <User size={12} className="text-primary" />
                  ) : (
                    <Bot size={12} className="text-primary" />
                  )}
                </div>
                
                {/* Message bubble */}
                <div className={`rounded-2xl px-3 py-2 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none"
                }`}>
                  <p className="text-sm">{message.content}</p>
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

      {/* Quick actions */}
      {quickActions.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t border-border/20">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Skriv ditt meddelande..."
            className="flex-grow text-sm"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || inputValue.trim() === ""}
            size="sm"
            className="px-3"
          >
            <Send size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
