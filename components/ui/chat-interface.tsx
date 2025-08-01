"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, X, Maximize2, Minimize2 } from "lucide-react"

// Distinct Chat Interface Icons
const VoiceIcon = ({ isRecording }: { isRecording: boolean }) => (
  <svg className={`w-4 h-4 ${isRecording ? 'text-red-500' : 'text-muted-foreground'}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
)

const AIAssistantIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.43-.35-.78-.78-.78-.17 0-.33.06-.46.14-.82.28-1.69.43-2.59.43-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .9-.15 1.77-.43 2.59-.08.13-.14.29-.14.46 0 .43.35.78.78.78.32 0 .61-.19.72-.49.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
)

const SendIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  typing?: boolean
}

interface ChatInterfaceProps {
  isOpen?: boolean
  onClose?: () => void
  context?: string
  quickActions?: Array<{ label: string; query: string }>
  className?: string
  embedded?: boolean
}

export function ChatInterface({ 
  isOpen = true, 
  onClose, 
  context = "general",
  quickActions = [],
  className = "",
  embedded = false
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: context === "seo" 
        ? "Hej! Jag hjälper dig med SEO-strategier och AI Overviews för StjärnaFyrkant. Vad vill du veta? 🎯"
        : "Hej! Jag är StjärnaFyrkants AI-assistent. Hur kan jag hjälpa dig idag? 🌟",
      role: "assistant",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response based on context
    setTimeout(() => {
      let aiResponse = "Tack för din fråga! Jag hjälper dig gärna."
      
      if (context === "seo") {
        if (input.toLowerCase().includes("keyword")) {
          aiResponse = "🎯 För keyword research i Västerbotten rekommenderar jag att fokusera på lokala söktermer som 'IT-support Umeå', 'fordonsteknik Västerbotten' och 'kommunikationslösningar Skellefteå'. Vill du att jag analyserar konkurrenter eller sökvolymer?"
        } else if (input.toLowerCase().includes("content")) {
          aiResponse = "📝 För AI-optimerat innehåll ska vi fokusera på FAQ-format som passar Google AI Overviews. Jag kan hjälpa dig skapa strukturerat innehåll för era tjänster. Vilken tjänst vill du börja med?"
        } else if (input.toLowerCase().includes("technical")) {
          aiResponse = "⚙️ För teknisk SEO behöver vi strukturerad data för Local Business, optimerade meta-taggar och sitemap. Jag kan generera schema markup för era tjänster. Vill du börja med IT eller fordonsteknik?"
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (query: string) => {
    setInput(query)
    inputRef.current?.focus()
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      content: context === "seo" 
        ? "Hej! Jag hjälper dig med SEO-strategier och AI Overviews för StjärnaFyrkant. Vad vill du veta? 🎯"
        : "Hej! Jag är StjärnaFyrkants AI-assistent. Hur kan jag hjälpa dig idag? 🌟",
      role: "assistant",
      timestamp: new Date(),
    }])
  }

  if (!isOpen && !embedded) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: isOpen ? 1 : 0, 
        scale: isOpen ? 1 : 0.95,
        y: isOpen ? 0 : 20
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
      className={`${embedded ? 'w-full' : 'fixed bottom-6 right-6 w-96 z-50'} ${className}`}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <AIAssistantIcon />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">StjärnaFyrkant AI</h3>
                <p className="text-xs text-muted-foreground">
                  {context === "seo" ? "SEO Expert" : "Smart Assistent"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!embedded && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                  >
                    {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                  </Button>
                  {onClose && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-7 w-7 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Actions */}
              {quickActions.length > 0 && (
                <div className="p-4 border-b border-border/20">
                  <p className="text-xs font-medium mb-3 text-muted-foreground">Snabbval:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleQuickAction(action.query)}
                        className="text-left p-2 text-xs bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className={`${embedded ? 'h-64' : 'h-80'} overflow-y-auto p-4 space-y-4`}>
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <AIAssistantIcon />
                        </div>
                      )}
                      
                      <div className={`group max-w-[80%] ${message.role === "user" ? "order-2" : ""}`}>
                        <div
                          className={`relative p-3 rounded-xl shadow-sm ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-primary to-primary/90 text-white ml-auto"
                              : "bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {/* Message Actions */}
                          <div className={`absolute top-1 ${message.role === "user" ? "left-1" : "right-1"} opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-5 w-5 p-0 hover:bg-black/10"
                            >
                              <Copy className="w-2.5 h-2.5" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className={`flex items-center gap-2 mt-1 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.role === "assistant" && (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-900">
                                <ThumbsUp className="w-2.5 h-2.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-red-100 dark:hover:bg-red-900">
                                <ThumbsDown className="w-2.5 h-2.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {message.role === "user" && (
                        <div className="w-6 h-6 bg-gradient-to-br from-muted to-muted/80 rounded-full flex items-center justify-center flex-shrink-0 mt-1 order-3">
                          <span className="text-xs font-semibold">Du</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-3"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <AIAssistantIcon />
                        </motion.div>
                      </div>
                      <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30 rounded-xl p-3 shadow-sm">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border/20 p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder={context === "seo" ? "Fråga om SEO, keywords, content..." : "Skriv ditt meddelande..."}
                      className="pr-8 h-9 text-sm bg-background/50 border-border/50 focus:border-primary/50 rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`absolute right-1 top-1 h-7 w-7 p-0 ${isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
                    >
                      <VoiceIcon isRecording={isRecording} />
                    </Button>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="sm"
                    className="h-9 px-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <SendIcon />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      AI-Powered
                    </Badge>
                    <span>• Säker</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearChat}
                    className="h-5 text-xs hover:text-primary p-0"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Rensa
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
