"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Target, TrendingUp, MessageSquare, Send, Copy, Check, Bot, User, Clock } from "lucide-react"
import Link from "next/link"
// Chat functionality removed - to be replaced with UI-kit based interface

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { SubtleCard } from "@/components/ui/subtle-card"
import { GlareCard } from "@/components/ui/glare-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChatInterface } from "@/components/ui/chat-interface"

const seoTools = [
  {
    title: "Keyword Research",
    description: "Hitta bästa keywords för Umeå-marknaden",
    icon: Target,
    prompts: [
      "Vilka är bästa lokala keywords för IT-support i Umeå?",
      "Analysera konkurrenter för 'fordonsteknik Västerbotten'",
      "Sökvolym för 'kommunikationslösningar Umeå'?"
    ]
  },
  {
    title: "Content Strategy",
    description: "Skapa AI-optimerat innehåll",
    icon: TrendingUp,
    prompts: [
      "Skriv FAQ om alkolås installation för AI Overviews",
      "Skapa lokalt innehåll för Servicedesk Umeå",
      "Meta descriptions för IT-tjänster som rankar högt"
    ]
  },
  {
    title: "Technical SEO",
    description: "Optimera tekniska aspekter",
    icon: Zap,
    prompts: [
      "Strukturerad data för Local Business i Umeå",
      "Schema markup för våra tjänster",
      "Sitemap struktur för bästa indexering"
    ]
  }
]

// Chat components removed - to be replaced with UI-kit based design

export default function SEOImplementationPage() {
  // Chat interface placeholder - to be replaced with UI-kit based design
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="relative mb-16">
            <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
            <div className="text-center relative z-10">
              <AnimatedText
                text="SEO Implementation Lab"
                el="h1"
                className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary mb-6"
              />
              <AnimatedText
                text="Experimentera och bygg din SEO-strategi med AI-assistans"
                el="p"
                className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              />
              <Link href="/seo-plan">
                <Button variant="outline" className="mb-8">
                  <ArrowRight size={16} className="mr-2 rotate-180" />
                  Tillbaka till SEO Plan
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tools Section */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">SEO Tools</h2>
              <div className="space-y-4">
                {seoTools.map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SubtleCard className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <tool.icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{tool.title}</h3>
                          <p className="text-xs text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {tool.prompts.map((prompt, promptIndex) => (
                          <button
                            key={promptIndex}
                            onClick={() => setSelectedTool(tool.title)}
                            className="w-full text-left text-xs p-2 rounded border border-border hover:bg-muted/50 transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </SubtleCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Interface Placeholder - To be implemented with UI-kit design */}
            <div className="lg:col-span-2">
              <SubtleCard className="h-[700px] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <MessageSquare size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SEO Strategy Assistant</h3>
                      <p className="text-sm text-muted-foreground">Chat interface kommer snart - baserat på UI-kit design</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">LIVE</Badge>
                  </div>
                </div>

                <ChatInterface
                  embedded={true}
                  context="seo"
                  quickActions={[
                    { label: "Keyword Research", query: "Hjälp mig hitta bästa keywords för Västerbotten" },
                    { label: "Content Strategy", query: "Skapa AI-optimerat innehåll för våra tjänster" },
                    { label: "Technical SEO", query: "Strukturerad data och schema markup" },
                    { label: "Local SEO", query: "Optimera för lokala sökningar i Västerbotten" },
                    { label: "AI Overviews", query: "Hur optimerar vi för Google AI Overviews?" },
                    { label: "Competitor Analysis", query: "Analysera konkurrenter i vår bransch" }
                  ]}
                  className="border-0 shadow-none bg-transparent"
                />
              </SubtleCard>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
