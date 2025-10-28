"use client"
import { motion } from "framer-motion"
import {
  Computer,
  Signal,
  Rocket,
  ArrowRight,
  Palette,
  Type,
  MousePointerClick,
  Layers,
  Grid,
  MessageSquare,
  Smartphone,
  UserPlusIcon as UniversalAccess,
  Truck,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlareCard } from "@/components/ui/glare-card"
import { SubtleCard } from "@/components/ui/subtle-card"
import { InteractiveGridBackground } from "@/components/ui/interactive-grid-background"
import { AnimatedText } from "@/components/ui/animated-text"
import { MysticalBackground } from "@/components/ui/mystical-background"
import { ShineButton } from "@/components/ui/shine-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { serviceColors } from "@/lib/service-colors"

const colors = [
  { name: "Brand Yellow", value: "#fedb00", variable: "hsl(var(--primary))" },
  { name: "Brand Black", value: "#000000", variable: "hsl(var(--background)) (dark)" },
  { name: "White", value: "#ffffff", variable: "hsl(var(--background)) (light)" },
  { name: "Card", value: "hsl(var(--card))", variable: "hsl(var(--card))" },
  { name: "Foreground", value: "hsl(var(--foreground))", variable: "hsl(var(--foreground))" },
  { name: "Muted Fg", value: "hsl(var(--muted-foreground))", variable: "hsl(var(--muted-foreground))" },
]

export default function UiKitPage() {
  return (
    <>
      {/* ChatWidget placeholder - to be replaced with UI-kit based chat interface */}
      <div className="relative z-10 flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-16">
          <MysticalBackground variant="hero" className="absolute inset-0 z-0" />
          {/* Hero Section */}
          <div className="text-center my-16">
            <AnimatedText
              text="Kinetic & Luminous"
              el="h1"
              animationType="soft"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary"
            />
            <AnimatedText
              text="Ett levande designsystem byggt för framtiden."
              el="p"
              animationType="soft"
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            />
            <motion.div 
              className="mt-8 p-3 md:p-4 rounded-xl bg-card/50 border max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground mb-3 md:mb-4 font-medium text-center">Designsystem Navigation</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 text-xs md:text-sm">
                <a href="#colors" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Färger</a>
                <a href="#service-colors" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Tjänstefärger</a>
                <a href="#iconography" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Ikonografi</a>
                <a href="#service-iconography" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Tjänste-ikoner</a>
                <a href="#chat-interface" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Chat Interface</a>
                <a href="#cards" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Kort</a>
                <a href="#buttons" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Knappar</a>
                <a href="#forms" className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-center font-medium">Formulär</a>
              </div>
            </motion.div>
          </div>

          <div className="space-y-12 md:space-y-24">
            {/* Philosophy Section */}
            <section>
              <AnimatedText text="Filosofi" el="h2" className="text-4xl font-bold mb-8 text-center" />
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <SubtleCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    >
                      <Layers />
                    </motion.div>
                    Kinetic
                  </h3>
                  <p className="text-muted-foreground">
                    Varje interaktion är designad för att kännas levande och responsiv. Vi använder meningsfull rörelse
                    för att guida användaren, ge feedback och skapa en känsla av flyt och dynamik som förbättrar
                    upplevelsen.
                  </p>
                </SubtleCard>
                <SubtleCard className="p-8">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Grid />
                    </motion.div>
                    Luminous
                  </h3>
                  <p className="text-muted-foreground">
                    Ljus är centralt i vårt visuella språk. Från subtil glöd till djärv glans, använder vi ljus för att
                    dra uppmärksamhet, skapa djup och framkalla en känsla av innovation och premiumkvalitet.
                  </p>
                </SubtleCard>
              </div>
            </section>

            {/* Colors Section */}
            <section id="colors">
              <AnimatedText text="Färgpalett" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Palette />
              </AnimatedText>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="p-4 rounded-lg border bg-card">
                    <div className="w-full h-20 rounded" style={{ backgroundColor: color.value }} />
                    <h3 className="font-semibold mt-2">{color.name}</h3>
                    <p className="text-sm text-muted-foreground">{color.variable}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography Section */}
            <section>
              <AnimatedText text="Typografi" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Type />
              </AnimatedText>
              <div className="space-y-6 bg-card/50 p-8 rounded-lg border">
                <p className="text-sm text-muted-foreground">Använd våra standardklasser för rubriker:</p>
                <div className="space-y-4">
                  <h1 className="heading-hero">.heading-hero</h1>
                  <h2 className="heading-section">.heading-section</h2>
                  <h3 className="heading-subsection">.heading-subsection</h3>
                </div>
                <hr className="my-6 border-border" />
                <p className="text-sm text-muted-foreground">Font: Open Sans</p>
                <AnimatedText text="H1: Kinetic & Luminous" el="h1" className="text-5xl font-extrabold" />
                <AnimatedText text="H2: Ett levande designsystem" el="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" />
                <AnimatedText text="H3: Byggt för framtiden" el="h3" className="text-2xl sm:text-3xl md:text-4xl font-semibold" />
                <p className="text-lg max-w-prose">
                  Detta är brödtext (18px). Genom banbrytande teknik och prisvinnande design bygger vi upplevelser som
                  engagerar, konverterar och består. Varje interaktion är genomtänkt.
                </p>
                <p className="max-w-prose">
                  Detta är normal brödtext (16px). Med rätt teknik, en lokal närvaro och ett stort, hållbart ansvar
                  hjälper vi till att skapa framtidens, starkare företagsmarknad.
                </p>
              </div>
            </section>

            {/* Iconography Section */}
            <section id="iconography">
              <AnimatedText text="Ikonografi" el="h2" className="text-4xl font-bold mb-8 text-center" />
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Prisvinnande kinetic ikoner som lever och andas med användaren. Varje ikon berättar en historia och skapar engagemang genom subtil rörelse.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {/* Processing/Loading Icons - have functional idle animations */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <Computer size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Processing</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <Signal size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Live Status</span>
                </motion.div>

                {/* Static icons with hover-only animations */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -8 }}
                >
                  <motion.div className="mb-3">
                    <Rocket size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Launch</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ x: 8 }}
                  >
                    <ArrowRight size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Navigate</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: 180, scale: 1.2 }}
                  >
                    <Palette size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Design</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ x: [-2, 2, -2, 0], transition: { duration: 0.3 } }}
                  >
                    <Type size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Typography</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ scale: [1, 0.9, 1.1, 1], transition: { duration: 0.3 } }}
                  >
                    <MousePointerClick size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Interactive</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.4 } }}
                  >
                    <Layers size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Structure</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ rotate: 90 }}
                  >
                    <Grid size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Layout</span>
                </motion.div>

                {/* Notification/Active state - functional pulse */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mb-3"
                  >
                    <MessageSquare size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Active Chat</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ y: [-2, -6, -2, 0], transition: { duration: 0.4 } }}
                  >
                    <Smartphone size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Responsive</span>
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-card/60 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div 
                    className="mb-3"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >
                    <UniversalAccess size={32} className="text-primary" />
                  </motion.div>
                  <span className="text-xs font-medium text-center">Accessible</span>
                </motion.div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Animation Philosophy</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                      >
                        🎯
                      </motion.div>
                      Hover-First
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Huvudfokus på hover-animationer. De ger direkt feedback när användaren interagerar.
                    </p>
                  </SubtleCard>
                  
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        ⚙️
                      </motion.div>
                      Functional Only
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Idle-animationer endast för funktionella syften: loading, live status, notifikationer.
                    </p>
                  </SubtleCard>
                  
                  <SubtleCard className="p-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <motion.div
                        whileHover={{ y: -3 }}
                      >
                        💫
                      </motion.div>
                      Meaningful Motion
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Varje rörelse berättar en historia eller förmedlar information. Ingen animation bara för animations skull.
                    </p>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Service Icon Examples */}
            <section id="service-icon-examples">
              <AnimatedText text="Tjänsteikoner" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Computer />
              </AnimatedText>
              <p className="text-lg text-muted-foreground mb-8">
                Exempel på hur tjänstefärgerna appliceras subtilt på befintliga ikoner och komponenter.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* IT Service Icon */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors group cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800/30"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <motion.div
                    className="mb-3 relative"
                    whileHover={{ rotate: [0, 360] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Computer size={32} className="text-blue-600 dark:text-blue-400" />
                    <motion.div 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <span className="text-xs font-medium text-center text-blue-600 dark:text-blue-400">IT-tjänster</span>
                </motion.div>

                {/* Fordonsteknik Service Icon */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors group cursor-pointer border border-transparent hover:border-green-200 dark:hover:border-green-800/30"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <motion.div
                    className="mb-3"
                    whileHover={{ y: [-2, -6, -2, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Truck size={32} className="text-green-600 dark:text-green-400" />
                  </motion.div>
                  <span className="text-xs font-medium text-center text-green-600 dark:text-green-400">Fordonsteknik</span>
                </motion.div>

                {/* Kommunikationsteknik Service Icon */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors group cursor-pointer border border-transparent hover:border-purple-200 dark:hover:border-purple-800/30"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <motion.div
                    className="mb-3"
                    whileHover={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Signal size={32} className="text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <span className="text-xs font-medium text-center text-purple-600 dark:text-purple-400">Kommunikation</span>
                </motion.div>

                {/* Servicedesk Service Icon */}
                <motion.div 
                  className="flex flex-col items-center p-6 rounded-lg bg-card/30 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors group cursor-pointer border border-transparent hover:border-orange-200 dark:hover:border-orange-800/30"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <motion.div
                    className="mb-3"
                    whileHover={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Users size={32} className="text-orange-600 dark:text-orange-400" />
                  </motion.div>
                  <span className="text-xs font-medium text-center text-orange-600 dark:text-orange-400">Servicedesk</span>
                </motion.div>
              </div>
              
              <div className="mt-8 p-6 rounded-xl border bg-card/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    ⚙️
                  </motion.div>
                  Implementation
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Subtila accenter:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Ikonfärger matchar tjänsteområde</li>
                      <li>• Hover-states med tjänstefärg</li>
                      <li>• Små indikator-dots</li>
                      <li>• Border-accenter på hover</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">Användning:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Navigeringsknappar</li>
                      <li>• Tjänstekort</li>
                      <li>• Quick actions i chat</li>
                      <li>• Status-indikatorer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Colors Section */}
            <section id="service-colors">
              <AnimatedText text="Tjänstefärger" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Signal />
              </AnimatedText>
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                  Varje tjänsteområde har sin egen färgidentitet som skapar tydlig kategorisering och förbättrar användarupplevelsen.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(serviceColors).filter(([key]) => key !== 'general').map(([key, colors]) => (
                    <motion.div 
                      key={key}
                      className="p-6 rounded-xl border bg-card relative overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.primary} opacity-5 group-hover:opacity-10 transition-opacity`} />
                      
                      {/* Color Swatches */}
                      <div className="relative z-10">
                        <div className="flex gap-2 mb-4">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.primary} shadow-lg`} />
                          <div className={`w-6 h-6 rounded-md ${colors.accent} opacity-80 self-end`} />
                          <div className={`w-4 h-4 rounded-sm ${colors.accent} opacity-60 self-end`} />
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2 capitalize">{colors.name}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Primär: {colors.primary}</p>
                          <p>Accent: {colors.accent}</p>
                          <p>Text: {colors.text}</p>
                        </div>
                        
                        {/* Example Usage */}
                        <div className="mt-4 p-3 rounded-lg border border-border/50">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full ${colors.accent}`} />
                            <span className="text-xs font-medium">Exempel</span>
                          </div>
                          <div className={`text-xs ${colors.text} ${colors.darkText}`}>
                            Subtila accenter på ikoner och knappar
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Service Iconography System */}
            <section id="service-iconography">
              <AnimatedText text="Tjänste-ikonografi" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Palette />
              </AnimatedText>
              <p className="text-lg text-muted-foreground mb-8">
                Varje tjänsteområde har sin egen ikonografi och visuella identitet som ska användas konsekvent.
              </p>
              
              <div className="grid gap-8">
                {/* IT Services */}
                <div className="p-6 rounded-xl border bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Computer className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">IT-tjänster</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <Computer className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Datorer</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <Signal className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Nätverk</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Support</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Analys</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Säkerhet</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                      </svg>
                      <span className="text-xs text-blue-600 dark:text-blue-400 text-center">Moln</span>
                    </div>
                  </div>
                </div>

                {/* Fordonsteknik */}
                <div className="p-6 rounded-xl border bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-950/20 dark:to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Fordonsteknik</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <Truck className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Fordon</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Kvalitet</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                      </svg>
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Service</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Kontroll</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Säkerhet</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-xs text-green-600 dark:text-green-400 text-center">Installation</span>
                    </div>
                  </div>
                </div>

                {/* Kommunikationsteknik */}
                <div className="p-6 rounded-xl border bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Signal className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Kommunikationsteknik</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:scale-105 transition-transform">
                      <Signal className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                      <span className="text-xs text-purple-600 dark:text-purple-400 text-center">Radio</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span className="text-xs text-purple-600 dark:text-purple-400 text-center">Telefoni</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:scale-105 transition-transform">
                      <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                      <span className="text-xs text-purple-600 dark:text-purple-400 text-center">Meddelanden</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-xs text-purple-600 dark:text-purple-400 text-center">Streaming</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                      <span className="text-xs text-purple-600 dark:text-purple-400 text-center">Övervakning</span>
                    </div>
                  </div>
                </div>

                {/* Servicedesk */}
                <div className="p-6 rounded-xl border bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-950/20 dark:to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Servicedesk</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <Users className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Support</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Telefon</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Chat</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Rapporter</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Lösningar</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 hover:scale-105 transition-transform">
                      <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
                      <span className="text-xs text-orange-600 dark:text-orange-400 text-center">Optimering</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-xl border bg-card/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    📋
                  </motion.div>
                  Användningsriktlinjer
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Konsistens:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Använd samma ikoner för samma koncept</li>
                      <li>• Behåll tjänstefärger genomgående</li>
                      <li>• Samma storlek inom samma kontext</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">Hierarki:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Primära ikoner: 24px-32px</li>
                      <li>• Sekundära ikoner: 16px-20px</li>
                      <li>• Accent ikoner: 12px-16px</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-purple-600 dark:text-purple-400">Kontext:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Hero-sektioner: Stora ikoner</li>
                      <li>• Tjänstekort: Medium ikoner</li>
                      <li>• Navigation: Små ikoner</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Chat Interface System */}
            <section id="chat-interface">
              <AnimatedText text="Chat Interface" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <MessageSquare />
              </AnimatedText>
              <p className="text-lg text-muted-foreground mb-8">
                Vårt prisvinnande chat-interface bryter mot konventioner och skapar en ny standard för användarupplevelse.
              </p>
              
              {/* Design Philosophy */}
              <div className="mb-12 p-8 rounded-xl border bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">Designfilosofi: "Navbar-First"</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Varför inte högra hörnet?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Klischigt:</strong> Alla gör likadant - vi är annorlunda</li>
                      <li>• <strong>Döljer funktionen:</strong> Användare missar viktiga verktyg</li>
                      <li>• <strong>Mobil-problem:</strong> Svårt att nå med tummen</li>
                      <li>• <strong>Ingen kontext:</strong> Separerat från navigation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-emerald-600 dark:text-emerald-400">Vår Navbar-lösning:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Synlig:</strong> Alltid tillgänglig i huvudnavigationen</li>
                      <li>• <strong>Kontextuell:</strong> Integrerad med tjänstemenyn</li>
                      <li>• <strong>Premium:</strong> Matchar vår designstandard</li>
                      <li>• <strong>Innovativ:</strong> Bryter mot branschkonventioner</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Chat Iconography */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                    🎨
                  </motion.div>
                  Chat Interface & Tjänsteikoner
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {/* IT Support */}
                  <motion.div 
                    className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-2 md:mb-3 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Computer className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <span className="text-xs font-medium text-center text-blue-600 dark:text-blue-400">IT-Support</span>
                  </motion.div>

                  {/* Fordonsteknik */}
                  <motion.div 
                    className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-2 md:mb-3 p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Truck className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <span className="text-xs font-medium text-center text-green-600 dark:text-green-400">Fordonsteknik</span>
                  </motion.div>

                  {/* Kommunikation */}
                  <motion.div 
                    className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-2 md:mb-3 p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Signal className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <span className="text-xs font-medium text-center text-purple-600 dark:text-purple-400">Kommunikation</span>
                  </motion.div>

                  {/* Servicedesk */}
                  <motion.div 
                    className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-2 md:mb-3 p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                    <span className="text-xs font-medium text-center text-orange-600 dark:text-orange-400">Servicedesk</span>
                  </motion.div>

                  {/* Chat Launcher */}
                  <motion.div 
                    className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-2 md:mb-3 relative"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 dark:text-yellow-400" />
                      <motion.div 
                        className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                    <span className="text-xs font-medium text-center text-yellow-600 dark:text-yellow-400">Chat Launcher</span>
                  </motion.div>

                  {/* AI Assistant */}
                  <motion.div 
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-3"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.43-.35-.78-.78-.78-.17 0-.33.06-.46.14-.82.28-1.69.43-2.59.43-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .9-.15 1.77-.43 2.59-.08.13-.14.29-.14.46 0 .43.35.78.78.78.32 0 .61-.19.72-.49.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                      </svg>
                    </motion.div>
                    <span className="text-xs font-medium text-center text-yellow-600 dark:text-yellow-400">AI Assistant</span>
                  </motion.div>

                  {/* Voice Input */}
                  <motion.div 
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                      </svg>
                    </motion.div>
                    <span className="text-xs font-medium text-center text-yellow-600 dark:text-yellow-400">Voice Input</span>
                  </motion.div>

                  {/* Copy Function */}
                  <motion.div 
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-3"
                      whileHover={{ scale: [1, 0.9, 1.1, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </motion.div>
                    <span className="text-xs font-medium text-center text-yellow-600 dark:text-yellow-400">Copy Function</span>
                  </motion.div>

                  {/* Fullscreen */}
                  <motion.div 
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800/30 hover:scale-105 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <motion.div
                      className="mb-3"
                      whileHover={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                      </svg>
                    </motion.div>
                    <span className="text-xs font-medium text-center text-yellow-600 dark:text-yellow-400">Fullscreen</span>
                  </motion.div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border bg-card/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                      ⚙️
                    </motion.div>
                    Teknisk Implementation
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>DeepSeek V3 AI:</strong> Avancerad språkmodell</li>
                    <li>• <strong>Streaming:</strong> Realtids-svar utan väntetid</li>
                    <li>• <strong>Framer Motion:</strong> Buttery-smooth animationer</li>
                    <li>• <strong>TypeScript:</strong> Type-safe utveckling</li>
                    <li>• <strong>Responsive:</strong> Fungerar på alla enheter</li>
                    <li>• <strong>Accessibility:</strong> WCAG-kompatibel</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl border bg-card/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      🏆
                    </motion.div>
                    Prisvinnande Funktioner
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Kontextuell AI:</strong> Förstår StjärnaFyrkant</li>
                    <li>• <strong>Quick Actions:</strong> Tjänstespecifika genvägar</li>
                    <li>• <strong>Smart Formatering:</strong> Automatisk textförbättring</li>
                    <li>• <strong>Notification System:</strong> Elegant badge-system</li>
                    <li>• <strong>Voice Ready:</strong> Förberedd för röstinput</li>
                    <li>• <strong>Copy-to-Clipboard:</strong> En-klicks kopiering</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cards Section */}
            <section id="cards">
              <AnimatedText text="Kort" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Layers />
              </AnimatedText>
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Primary Card (Glare)</h3>
                  <GlareCard className="bg-card/80 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center h-80">
                    <Computer size={48} className="text-primary mb-4" />
                    <h3 className="text-2xl font-semibold">Holografisk Effekt</h3>
                    <p className="text-muted-foreground mt-2">För maximal visuell impact.</p>
                  </GlareCard>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Secondary Card (Subtle)</h3>
                  <SubtleCard className="flex flex-col justify-center items-center text-center h-80">
                    <Signal size={48} className="text-primary mb-4" />
                    <h3 className="text-2xl font-semibold">Subtil Interaktion</h3>
                    <p className="text-muted-foreground mt-2">Elegant och avskalad med en interaktiv glow.</p>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Buttons Section */}
            <section id="buttons">
              <AnimatedText text="Knappar" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <MousePointerClick />
              </AnimatedText>
              <div className="space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Primära Knappar</h3>
                  <SubtleCard className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
                      <Button>Standard</Button>
                      <Button size="sm">Liten</Button>
                      <Button size="lg">Stor</Button>
                      <Button disabled>Inaktiv</Button>
                      <ShineButton>Shine Effect</ShineButton>
                    </div>
                  </SubtleCard>
                </div>

                {/* Secondary Buttons */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Sekundära Knappar</h3>
                  <SubtleCard className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </SubtleCard>
                </div>

                {/* Icon Buttons */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Ikon Knappar</h3>
                  <SubtleCard className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
                      <Button size="icon">
                        <Rocket className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Computer className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Palette className="h-4 w-4" />
                      </Button>
                      <Button>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Med ikon
                      </Button>
                      <Button variant="outline">
                        Ikon efter
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </SubtleCard>
                </div>

                {/* Service Colored Buttons */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Tjänstefärgade Knappar</h3>
                  <SubtleCard className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
                      <Button className="bg-blue-600 hover:bg-blue-700">IT-Support</Button>
                      <Button className="bg-green-600 hover:bg-green-700">Fordonsteknik</Button>
                      <Button className="bg-purple-600 hover:bg-purple-700">Kommunikation</Button>
                      <Button className="bg-orange-600 hover:bg-orange-700">Servicedesk</Button>
                    </div>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Forms Section */}
            <section id="forms">
              <AnimatedText text="Formulär" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Grid />
              </AnimatedText>
              <div className="space-y-8">
                {/* Input States */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Input Tillstånd</h3>
                  <SubtleCard className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="normal">Normal</Label>
                        <Input id="normal" placeholder="Skriv här..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="focused">Fokuserad</Label>
                        <Input id="focused" placeholder="Fokuserad input" className="ring-2 ring-primary" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="error">Fel</Label>
                        <Input id="error" placeholder="Fel input" className="border-red-500 focus:ring-red-500" />
                        <p className="text-sm text-red-500">Detta fält är obligatoriskt</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disabled">Inaktiv</Label>
                        <Input id="disabled" placeholder="Inaktiv input" disabled />
                      </div>
                    </div>
                  </SubtleCard>
                </div>

                {/* Complete Form Example */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Komplett Formulär</h3>
                  <SubtleCard className="p-8">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Förnamn *</Label>
                          <Input id="firstName" placeholder="Anna" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Efternamn *</Label>
                          <Input id="lastName" placeholder="Andersson" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emailForm">E-post *</Label>
                        <Input id="emailForm" type="email" placeholder="anna@exempel.se" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Företag</Label>
                        <Input id="company" placeholder="Företag AB" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" type="tel" placeholder="070-123 45 67" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Meddelande *</Label>
                        <textarea 
                          id="message" 
                          className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Beskriv ditt ärende..."
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="terms" className="rounded border-input" required />
                        <Label htmlFor="terms" className="text-sm">
                          Jag godkänner <a href="#" className="text-primary hover:underline">villkoren</a> och <a href="#" className="text-primary hover:underline">integritetspolicyn</a>
                        </Label>
                      </div>
                      
                      <div className="flex justify-end">
                        <ShineButton type="submit">Skicka meddelande</ShineButton>
                      </div>
                    </form>
                  </SubtleCard>
                </div>
              </div>
            </section>

            {/* Backgrounds Section */}
            <section>
              <AnimatedText
                text="Dynamiska Bakgrunder"
                el="h2"
                className="text-4xl font-bold mb-8 flex items-center gap-4"
              >
                <Grid />
              </AnimatedText>
              <div className="max-w-2xl mx-auto">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Interactive Grid</h3>
                  <div className="h-80 rounded-lg border relative overflow-hidden">
                    <InteractiveGridBackground />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-muted-foreground bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        Rör musen över ytan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsive Section */}
            <section>
              <AnimatedText text="Responsiv Design" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Smartphone />
              </AnimatedText>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-muted-foreground">
                  <p className="text-lg">
                    Alla komponenter och layouter är byggda med en "mobile-first"-strategi. Detta säkerställer en
                    perfekt upplevelse oavsett enhet, från den minsta mobilskärmen till den största datorskärmen.
                    Flexibilitet och tillgänglighet är kärnan i vår design.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-[375px] h-[667px] bg-card rounded-3xl border-8 border-secondary p-4 shadow-2xl">
                    <div className="h-full w-full overflow-y-auto rounded-xl">
                      <SubtleCard className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Computer size={24} />
                          </div>
                          <h3 className="text-xl font-semibold">IT-tjänster</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow text-sm">
                          Säker, skalbar IT för företag. Vi hanterar allt från nätverk och säkerhet till molntjänster
                          och support.
                        </p>
                        <Button variant="outline" className="mt-auto bg-transparent w-full">
                          Läs mer <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </SubtleCard>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Accessibility Section */}
            <section>
              <AnimatedText text="Tillgänglighet" el="h2" className="text-4xl font-bold mb-8 flex items-center gap-4">
                <UniversalAccess />
              </AnimatedText>
              <SubtleCard className="p-8">
                <p className="text-lg text-muted-foreground max-w-prose">
                  En prisvinnande design är en design för alla. Vi följer WCAG-riktlinjerna och ser till att vår kod är
                  semantiskt korrekt, att kontraster är tillräckliga och att alla interaktiva element kan navigeras med
                  tangentbord.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Button>Synlig text</Button>
                  <Button>
                    <Rocket className="mr-2 h-4 w-4" />
                    Ikon & text
                  </Button>
                  <Button size="icon" aria-label="Starta raket">
                    <Rocket className="h-4 w-4" />
                  </Button>
                  <p className="text-muted-foreground">(Knappen till höger har en `aria-label` för skärmläsare)</p>
                </div>
              </SubtleCard>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
